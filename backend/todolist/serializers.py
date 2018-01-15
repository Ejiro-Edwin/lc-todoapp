from rest_framework import serializers, generics
from todolist.models import TodoList, Task
from user_auth.models import Account
from user_auth.serializers import AccountSerializer

class TodoListSerializer(serializers.ModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='todolist-detail')
    created_at = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = TodoList
        fields = ('id','link','created_at', 'title', 'created', 'modified')
        read_only_fields = ('created_at',)

class TaskSerializer(serializers.ModelSerializer):
    created_at = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    assign_to_id = serializers.PrimaryKeyRelatedField(source='assign_to',  queryset=Account.objects.all(), )
    assign_to = AccountSerializer(read_only=True)
    class Meta:
        model = Task
        fields = ('id', 'status','created_at','description','assign_to', 'assign_to_id',
                    'todolist','deadline','completed_date')
        read_only_fields = ('created_at',)
