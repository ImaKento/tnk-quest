import os
import django
import sys
sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import KichiCustomer
import random

# KichiCustomer モデルから全てのレコードを取得
customers = KichiCustomer.objects.all()

# 全ての顧客レコードをループ処理
for customer_to_update in customers:
    # seating_preferenceが'カウンター'なら'bar'に、'テーブル'なら'table'に変換
    if customer_to_update.seating_preference == 'カウンター':
        customer_to_update.seating_preference = 'bar'
    elif customer_to_update.seating_preference == 'テーブル':
        customer_to_update.seating_preference = 'table'

    # 時間帯をランダムに設定
    customer_to_update.time = f"time{random.randrange(1, 5)}"
    
    # 更新された情報を保存
    customer_to_update.save()
    print(f"Customer {customer_to_update.email_address} data has been updated with time slot {customer_to_update.time} and seating preference {customer_to_update.seating_preference}.")
