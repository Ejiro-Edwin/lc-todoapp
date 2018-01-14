from rest_framework import serializers, generics
from todolist.models import TodoList, Task


class TodoListSerializer(serializers.HyperlinkedModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='todolist-detail')
    created_at = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = TodoList
        fields = ('id','link','created_at', 'title', 'created', 'modified')
        read_only_fields = ('created_at',)

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='task-detail')
    created_at = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    class Meta:
        model = Task
        fields = ('id','link', 'status','created_at','description','assign_to',
                    'todolist','deadline','completed_date')
        read_only_fields = ('created_at',)
