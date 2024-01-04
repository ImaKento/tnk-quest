# KichiCustomer モデルから全てのエントリを取得
import os
import django
import sys
sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from tnk_quest.models import Hunters, Quests

hunters = Hunters.objects.all()

# 各カスタマーの詳細情報を出力
for hunter in hunters:
    print(f"id: {hunter.id}")
    print(f"User: {hunter.user_name}")
    print(f"Pass: {hunter.password}")
    print("-" * 40)  # セパレーターを表示してエントリを区切る

# エントリの総数を出力
print(f"Total number of hunters: {hunters.count()}")
