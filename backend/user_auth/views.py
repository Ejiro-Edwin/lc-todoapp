import json
from itertools import chain
from rest_framework import viewsets, permissions, status, views, generics
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from user_auth.models import Account, PasswordForgotRequest
from todolist.models import Task
from user_auth.serializers import AccountSerializer, PasswordResetSerializer
from rest_framework.throttling import AnonRateThrottle
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from .send_email import send_html_mail
from django.conf import settings
from datetime import datetime
from rest_framework.parsers import MultiPartParser, JSONParser
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class UserViewSet(viewsets.ModelViewSet):
    """User API Views"""
    queryset = Account.objects.all()
    serializer_class= AccountSerializer
    parser_classes = (MultiPartParser, )


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
        subject = "Recuperar senha"
        site_domain = request.get_host()
        link = site_domain+"/auth/recover-password/"+preq.uuid_str+"/"+email
        html_message = "Olá, você solicitou a recuperação de sua senha, Clique neste link <a href='{link}'>{link}</a> para criar uma nova".format(
            link=link
        )
        send_html_mail(
            subject,
            html_content=html_message,
            recipient_list=(user.email, ),
            sender=settings.FROM_EMAIL,
        )

        return Response({"message": "Email enviado"}, status=status.HTTP_202_ACCEPTED)

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
        try:
            pwdreq = PasswordForgotRequest.objects.get(hash=uuid, used=False )
        except PasswordForgotRequest.DoesNotExist:
            pwdreq = None
        if pwdreq:
            if pwdreq.user.email != serializer.data['email']:
                return Response(
                    {"message": "Você não tem permissão para realizar essa ação"},
                    status=status.HTTP_403_FORBIDDEN)
            #update password request record
            pwdreq.used = True
            pwdreq.save()
            # update password
            user = Account.objects.get(pk=pwdreq.user.pk)
            user.set_password(serializer.data['password'])
            user.save()

        else: 
            return Response({"message": "Dados inválidos"},status=status.HTTP_404)
            
        return Response({"message": "Nova senha criada com sucesso"},status=status.HTTP_200_OK)

