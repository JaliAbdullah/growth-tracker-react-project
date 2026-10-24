from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Habit, HabitLog, Book, StudySession, PlannerTask

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(["A user with that email already exists."])
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class HabitLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitLog
        fields = ['id', 'habit', 'date_completed', 'notes']

class HabitSerializer(serializers.ModelSerializer):
    logs = HabitLogSerializer(many=True, read_only=True)

    class Meta:
        model = Habit
        fields = ['id', 'name', 'frequency', 'created_at', 'logs']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'total_pages', 'pages_read', 'status', 'rating']

    # TC08: Validation guard checking pages_read does not exceed total_pages
    def validate(self, data):
        total = data.get('total_pages', getattr(self.instance, 'total_pages', 0))
        read = data.get('pages_read', getattr(self.instance, 'pages_read', 0))
        if read > total:
            raise serializers.ValidationError({"pages_read": "Pages read cannot exceed total pages."})
        return data

class StudySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySession
        fields = ['id', 'subject', 'duration_minutes', 'session_date']

class PlannerTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlannerTask
        fields = ['id', 'title', 'goal_type', 'due_date', 'status']