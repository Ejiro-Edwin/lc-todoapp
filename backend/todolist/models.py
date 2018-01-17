from django.db import models
from user_auth.models import Account
from model_utils.models import SoftDeletableModel, TimeStampedModel, StatusField, MonitorField

class TodoList(SoftDeletableModel,TimeStampedModel):
    created_at = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Task(SoftDeletableModel,TimeStampedModel):
    STATUS = (
        ('incompleted', 'incompleted'),
        ('completed', 'completed'),
    )
    status = StatusField(default='incompleted')
    created_at = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    description = models.CharField(max_length=200)
    assign_to = models.ForeignKey(Account, null=True, blank=True, related_name='assign_to', on_delete=models.DO_NOTHING)
    todolist = models.ForeignKey(TodoList, on_delete=models.CASCADE)
    deadline = models.DateTimeField(null=True)
    completed_date = MonitorField(monitor='status', when=['completed'], null=True, default=None)

    def __str__(self):
        return self.description