from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class Habit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    name = models.CharField(max_length=100)
    frequency = models.CharField(max_length=20, default='DAILY')  # DAILY or WEEKLY
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"

class HabitLog(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='logs')
    date_completed = models.DateField()
    notes = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('habit', 'date_completed')

    def __str__(self):
        return f"{self.habit.name} - {self.date_completed}"

class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='books')
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100, default='Independent Study')
    total_pages = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    pages_read = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, default='TO READ')  # TO READ, IN PROGRESS, FINISHED
    rating = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return f"{self.title} ({self.user.username})"

class StudySession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='study_sessions')
    subject = models.CharField(max_length=100)
    duration_minutes = models.PositiveIntegerField(validators=[MinValueValidator(1)])  # TC11 Guard
    session_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.subject} - {self.duration_minutes} mins"

class PlannerTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='planner_tasks')
    title = models.CharField(max_length=200)
    goal_type = models.CharField(max_length=10, default='DAILY')  # DAILY, WEEKLY, MONTHLY
    due_date = models.DateField()
    status = models.CharField(max_length=20, default='To Do')  # To Do, In Progress, Completed

    def __str__(self):
        return f"{self.title} [{self.status}]"