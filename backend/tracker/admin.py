from django.contrib import admin

# Register your models here
from django.contrib import admin
from .models import Habit, HabitLog, Book, StudySession, PlannerTask

@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user', 'frequency', 'created_at')
    list_filter = ('frequency', 'user')
    search_fields = ('name',)

@admin.register(HabitLog)
class HabitLogAdmin(admin.ModelAdmin):
    list_display = ('id', 'habit', 'date_completed')
    list_filter = ('date_completed',)

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'user', 'pages_read', 'total_pages', 'status', 'rating')
    list_filter = ('status', 'rating', 'user')
    search_fields = ('title', 'author')

@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'subject', 'user', 'duration_minutes', 'session_date')
    list_filter = ('session_date', 'user')
    search_fields = ('subject',)

@admin.register(PlannerTask)
class PlannerTaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'goal_type', 'due_date', 'status')
    list_filter = ('goal_type', 'status', 'user')
    search_fields = ('title',)