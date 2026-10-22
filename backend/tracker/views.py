from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Habit, HabitLog, Book, StudySession, PlannerTask
from .serializers import (
    UserRegisterSerializer, HabitSerializer, HabitLogSerializer, 
    BookSerializer, StudySessionSerializer, PlannerTaskSerializer
)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BaseUserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Strict per-user isolation (FR8, NFR5, TC06)
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HabitViewSet(BaseUserViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    @action(detail=True, methods=['post'])
    def log(self, request, pk=None):
        habit = self.get_object()
        date_completed = request.data.get('date_completed')
        log_entry, created = HabitLog.objects.get_or_create(habit=habit, date_completed=date_completed)
        if not created:
            log_entry.delete()
            return Response({'status': 'unmarked'}, status=status.HTTP_200_OK)
        return Response({'status': 'marked'}, status=status.HTTP_201_CREATED)

class BookViewSet(BaseUserViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class StudySessionViewSet(BaseUserViewSet):
    queryset = StudySession.objects.all()
    serializer_class = StudySessionSerializer

class PlannerTaskViewSet(BaseUserViewSet):
    queryset = PlannerTask.objects.all()
    serializer_class = PlannerTaskSerializer

class DashboardSummaryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        habits_count = Habit.objects.filter(user=user).count()
        books_count = Book.objects.filter(user=user).count()
        studies_count = StudySession.objects.filter(user=user).count()
        tasks_count = PlannerTask.objects.filter(user=user).count()
        
        return Response({
            'user': user.username,
            'summary': {
                'active_habits': habits_count,
                'total_books': books_count,
                'study_sessions': studies_count,
                'planner_tasks': tasks_count
            }
        })