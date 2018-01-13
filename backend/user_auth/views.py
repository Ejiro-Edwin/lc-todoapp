import json
from itertools import chain
from rest_framework import viewsets, permissions, status, views, generics
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from user_auth.models import Account
from user_auth.serializers import AccountSerializer
from rest_framework.permissions import IsAuthenticated

class UserViewSet(viewsets.ModelViewSet):
    """User API Views"""
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated,)
