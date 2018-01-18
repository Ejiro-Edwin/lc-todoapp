import string
import requests
import json
from datetime import datetime

from .models import Task
from celery import shared_task
from user_auth.models import Account
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives


@shared_task
def send_report(user_id):
    try:
        user = Account.objects.get(pk = user_id)
    except Account.DoesNotExist:
        user = None
    if user:
        today_tasks = Task.objects.filter(completed_date__date = datetime.today())
        future_tasks = Task.objects.filter(deadline__date__gte = datetime.today())
        if today_tasks or future_tasks:
            subject, from_email, to = 'To Do App', 'testelabcodes@gmail.com', user.email
        
            html_content = render_to_string('mail_template.html', {'user':user, 'tasks': today_tasks, 'future_tasks':future_tasks}) # render with dynamic value
            text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.

            # create the email, and attach the HTML version as well.
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            return msg.send()
        else: 
            return "Usuario não tem tasks"
    return "Usuario não encontrado"

@shared_task
def automatic_reports():
    users = Account.objects.all()
    for user in users:
        send_report.delay(user.pk)