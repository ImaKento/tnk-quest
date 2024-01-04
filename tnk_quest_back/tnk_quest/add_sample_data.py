import random
from datetime import datetime
import os
import django
import sys

sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import KichiCustomer

# 追加される言語のリスト
languages = ['en', 'ja', 'ko', 'zh-CN', 'zh-TW']

new_data = [
    {"email_address": "kichitaro@kichikichi.com", "name": "Kichitaro Kichi", "time": "time1", "seating_preference": "bar", "number_of_people": 1},
    {"email_address": "kichijiro@kichikichi.com", "name": "Kichijiro Kichi", "time": "time1", "seating_preference": "table", "number_of_people": 1},
    {"email_address": "kichisaburo@kichikichi.com", "name": "Kichitaro Kichi", "time": "time4", "seating_preference": "table", "number_of_people": 1},
    {"email_address": "kichishiro@kichikichi.com", "name": "Kichishiro Kichi", "time": "time2", "seating_preference": "bar", "number_of_people": 1},
    {"email_address": "kichigoro@kichikichi.com", "name": "Kichigoro Kichi", "time": "time3", "seating_preference": "bar", "number_of_people": 1},
    {"email_address": "kichirokuro@kichikichi.com", "name": "Kichirokuro Kichi", "time": "time2", "seating_preference": "bar", "number_of_people": 1},
    {"email_address": "kichinanaro@kichikichi.com", "name": "Kichinanaro Kichi", "time": "time2", "seating_preference": "bar", "number_of_people": 1},
    {"email_address": "kichihachiro@kichikichi.com", "name": "Kichihachiro Kichi", "time": "time3", "seating_preference": "bar", "number_of_people": 1},
]

new_customers = [
    KichiCustomer(
        email_address=customer["email_address"],
        name=customer["name"],
        time=customer["time"],
        seating_preference=customer["seating_preference"],
        number_of_people=customer["number_of_people"],
        language=random.choice(languages)  # ランダムに選択された言語を追加
    ) for customer in new_data
]

# Save the new customers to the database
for customer in new_customers:
    customer.save()
