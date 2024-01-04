from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

import sys
import os
import django

sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import KichiCustomer
from kichi.serializers import KichiCustomerSerializer

class KichiCustomerTests(APITestCase):
    def setUp(self):
        # ここでテスト用のデータをセットアップすることができます。
        KichiCustomer.objects.create(email_address='test@example.com', name='テスト 太郎', time='time1', seating_preference='カウンター', number_of_people=3)

    def test_get_customers(self):
        # GETリクエストで顧客リストを取得する
        url = reverse('kichi_customer_list_create')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # 応答のデータがデータベースの内容と一致することを検証する
        customers = KichiCustomer.objects.all()
        serializer = KichiCustomerSerializer(customers, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_create_customer(self):
        # POSTリクエストで新しい顧客を作成する
        url = reverse('kichi_customer_list_create')
        data = {'email_address':'new@example.com','name': '新規 一郎', 'seating_preference':'カウンター', 'time':'time2', 'number_of_people': 5}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # データベースに顧客が正しく追加されたことを検証する
        self.assertEqual(KichiCustomer.objects.count(), 2)
        new_customer = KichiCustomer.objects.get(name='新規 一郎')
        self.assertEqual(new_customer.number_of_people, 5)
