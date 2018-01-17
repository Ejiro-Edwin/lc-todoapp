from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers, generics
from user_auth.models import Account
from django.forms.fields import ImageField
from django.contrib.auth.password_validation import validate_password

class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, style={'input_type': 'password'})
    image = ImageField(max_length=None, allow_empty_file=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'password', 'image')
        read_only_fields = ('created_at', 'updated_at',)



class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    hash = serializers.UUIDField(required=True)
    password = serializers.CharField(required=True)

