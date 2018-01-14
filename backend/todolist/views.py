from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from todolist.models import TodoList, Task
from todolist.serializers import TodoListSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated

class TodoListViewSet(viewsets.ModelViewSet):
    """Todo API Views"""
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    permission_classes = (IsAuthenticated,)

    @detail_route(methods=['get'], permission_classes=[IsAuthenticated])
    def tasks(self, request, pk=None):
        todo = self.get_object()
        tasks = Task.objects.filter(todolist=todo)
        response = TaskSerializer(instance=tasks, many=True, context={'request': request})
        return Response(response.data)

class TasksViewSet(viewsets.ModelViewSet):
    """Tasks API Views"""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (IsAuthenticated,)


    

