from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, HabitViewSet, BookViewSet, 
    StudySessionViewSet, PlannerTaskViewSet, DashboardSummaryView
)

router = DefaultRouter()
router.register(r'habits', HabitViewSet, basename='habit')
router.register(r'books', BookViewSet, basename='book')
router.register(r'study-sessions', StudySessionViewSet, basename='study-session')
router.register(r'tasks', PlannerTaskViewSet, basename='task')

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('dashboard/', DashboardSummaryView.as_view(), name='dashboard-summary'),
    path('', include(router.urls)),
]