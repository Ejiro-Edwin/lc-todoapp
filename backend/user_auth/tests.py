from __future__ import unicode_literals

from datetime import date, timedelta

from django.test import TestCase

from rest_framework.test import APIClient, APITestCase

from django.urls import reverse, resolve
from django.forms import model_to_dict
from model_mommy.recipe import Recipe, seq
from model_mommy import mommy
from user_auth.models import AccountManager, Account
import sys


class TestLogin(APITestCase):
    client = APIClient
    model = Account

    def setUp(self):
        self.email = 'teste@email.com.br'
        self.password = 'test_password'

        self.user = self.model.objects.create_user(
            password=self.password,
            email=self.email,
        )


    def test_no_authorization(self):
        res = self.client.get(
            reverse('todolist-list')
            )

        self.assertEqual(res.status_code, 403)
        self.assertIn('As credenciais de autenticação não foram fornecidas.', res.data['detail'])


    def test_user_can_get_access_and_refresh_tokens_and_use_them(self):
        res = self.client.post(
            reverse('token_obtain_pair'),
            data={
                'email': self.email,
                'password': self.password,
            },
        )

        access = res.data['access']
        refresh = res.data['refresh']


        self.assertEqual(res.status_code, 200)

        res = self.client.post(
            reverse('token_refresh'),
            data={'refresh': refresh},
        )

        access = res.data['access']

        self.assertEqual(res.status_code, 200)

    def test_login_wrong_password(self):
        res = self.client.post(
            reverse('token_obtain_pair'),
            data={
                'email': self.email,
                'password': 'test_password1',
            },
        )
        self.assertEqual(res.status_code, 400)
        self.assertIn('No active account found with the given credentials', res.data['non_field_errors'])

    def test_login_wrong_email(self):
        res = self.client.post(
            reverse('token_obtain_pair'),
            data={
                'email': 'teste1@email.com.br',
                'password': self.password,
            },
        )
        self.assertEqual(res.status_code, 400)
        self.assertIn('No active account found with the given credentials', res.data['non_field_errors'])



class TestAccount(APITestCase):
    model = Account
    client = APIClient
    url_list = reverse('account-list')
    # print(vars(vars(resolve(url_list).func)['cls'])['serializer_class'])
    url_detail = reverse('account-detail', kwargs={"pk": 1})
    model_recipe = 'user_auth.account_recipe'
    obj = None


    @classmethod
    def setUpTestData(cls):
        cls.obj = mommy.make_recipe(cls.model_recipe)

    def setUp(self):
        self.email = 'teste@teste.com.br'
        self.password = 'password'
        self.user = self.model.objects.create_user(
            email=self.email,
            password=self.password,
        )
        self.client.login(
            email=self.email,
            password=self.password,
        )


    def test_model(self):
        obj = self.obj
        self.assertTrue(isinstance(obj, self.model))
        self.assertEqual(obj.__unicode__(), obj.email)
        self.assertEqual(obj.__str__(), obj.email)
        self.assertEqual(obj.get_full_name(), str(obj.first_name + ' ' + obj.last_name))
        self.assertEqual(obj.get_short_name(), obj.first_name)

    def test_api_get_list(self):
        obj = self.obj
        res = self.client.get(self.url_list)
        self.assertEqual(res.status_code, 200)

    def test_api_get_detail(self):
        obj = self.obj
        res = self.client.get(self.url_detail)
        self.assertEqual(res.status_code, 200)

    def test_api_post(self):
        obj = mommy.prepare_recipe(self.model_recipe)
        data = {'email': obj.email, 'first_name': obj.first_name, 'last_name': obj.last_name, 'password': obj.password,
                'image': ""}
        res = self.client.post(self.url_list, data=data)
        self.assertEqual(res.status_code, 201)

    def test_api_put(self):
        obj = mommy.make_recipe(self.model_recipe)
        new_obj = model_to_dict(mommy.prepare_recipe(self.model_recipe))
        data = {'email1': obj.email, 'first_name': obj.first_name, 'last_name': obj.last_name, 'password': obj.password,
                'image': ""}
        for value in data.pop('image'):
            new_value = str(value)
            data[value] = new_obj[new_value]
            res = self.client.put(self.url_detail, data=data)
            self.assertEqual(res.status_code, 200)