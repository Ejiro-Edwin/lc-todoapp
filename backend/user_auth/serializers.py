from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers, generics
from user_auth.models import Account
from django.forms.fields import ImageField


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    link = serializers.HyperlinkedIdentityField(view_name='account-detail')
    password = serializers.CharField(write_only=True, required=False, style={'input_type': 'password'})
    image = ImageField(max_length=None, allow_empty_file=False)

    class Meta:
        model = Account
        fields = ('id', 'link', 'email', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'password', 'image')
        read_only_fields = ('created_at', 'updated_at',)
