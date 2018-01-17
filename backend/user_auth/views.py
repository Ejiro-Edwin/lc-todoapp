import json
from itertools import chain
from rest_framework import viewsets, permissions, status, views, generics
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from user_auth.models import Account, PasswordForgotRequest
from user_auth.serializers import AccountSerializer, PasswordResetSerializer
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    """User API Views"""
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class PasswordRecoveryAPIView(views.APIView):
    """
    API views that manages the recovery password process
    """
    permission_classes = (AllowAny, )
    throttle_classes = (AnonRateThrottle, )

    queryset = Account.objects.all()

    def get(self, request):
        """ send recovery email if the username exists """
        # if username isn't in the get request, raise a 404 error
        email = request.query_params.get('email', None)
        if email is None:
            raise Http404
        user = get_object_or_404(self.queryset, email=email)
        #create new password request
        preq = PasswordForgotRequest(user=user, ip_addr=request.META['REMOTE_ADDR'])
        preq.save()

        #send recovery email
        subject = "Olá, você solicitou a recuperação de sua senha,"
        link = "/recover/password/?hash="+preq.uuid_str
        html_message = "Clique neste link <a href='{link}'>{link}</a> para criar uma nova".format(
            link=link
        )
        print(send_mail(
            subject,
            message="Recuperar Senha",
            html_message=html_message,
            from_email=settings.FROM_EMAIL,
            recipient_list=(user.email, ),
        ))

        return Response(status=status.HTTP_202_ACCEPTED)

class PasswordResetAPIView(views.APIView):
    """
    API views that manage reset password process
    """
    permission_classes = (AllowAny, )
    throttle_classes = (AnonRateThrottle, )

    """ update user password if the give hash is valid """
    def post(self, request):
        #hash, password and email fields must exists in the request body
        serializer = PasswordResetSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        uuid = serializer.data['hash']
        pwdreq = get_object_or_404(PasswordForgotRequest, hash=uuid, used=0)
        if pwdreq.user.email != serializer.data['email']:
            return Response(
                {"you're not authorized to perform this operation"},
                status=status.HTTP_403_FORBIDDEN)
        #update password request record
        pwdreq.used = True
        pwdreq.save()
        # update password
        user = Account.objects.get(pk=pwdreq.user.pk)
        user.set_password(serializer.data['password'])
        user.save()

        return Response(status=status.HTTP_200_OK)
