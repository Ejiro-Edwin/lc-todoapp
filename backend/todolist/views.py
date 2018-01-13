import json
from itertools import chain
from rest_framework import viewsets
from todolist.models import TodoList, Task
from todolist.serializers import TodoListSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated

class TodoListViewSet(viewsets.ModelViewSet):
    """Todo API Views"""
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    permission_classes = (IsAuthenticated,)


class TasksViewSet(viewsets.ModelViewSet):
    """Tasks API Views"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)
