from __future__ import unicode_literals
from django.template.defaultfilters import slugify
from django.db import models
from datetime import datetime
from django.utils import timezone
from django.db.models.signals import post_save, pre_save
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, User
from django.dispatch import receiver
import uuid


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        account = self.model(email=self.normalize_email(email), **kwargs)
        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account

class Account(AbstractBaseUser):
    email = models.EmailField(unique=True, error_messages={'unique':"Já existe uma conta com esse email."})
    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    is_admin = models.BooleanField(default=False)
    @property
    def is_staff(self):
        return self.is_admin
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = AccountManager()
    image = models.ImageField(upload_to="users/pictures/", default='users/default.jpg' ,blank=True,null=True)
    USERNAME_FIELD = 'email'

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name
	
    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

class PasswordForgotRequest(models.Model):
    hash = models.UUIDField(blank=False, editable=False)
    user = models.ForeignKey(Account, related_name="password_requests", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    used = models.BooleanField(default=False)
    ip_addr = models.GenericIPAddressField(blank=False, default='0.0.0.0')

    class Meta:
        ordering = ('date', )

    @property
    def uuid_str(self):
        return str(self.hash)

@receiver(pre_save, sender=PasswordForgotRequest)
def generate_hash(sender, instance, *args, **kwargs):
    if instance.pk is None:
        instance.hash = uuid.uuid4()