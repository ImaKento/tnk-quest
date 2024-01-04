# KichiCustomer モデルから全てのエントリを取得
import os
import django
import sys
sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from tnk_quest.models import Quests

quests = Quests.objects.all()

# 各カスタマーの詳細情報を出力
for quest in quests:
    print(f"client: {quest.client}")
    print(f"title: {quest.title}")
    print(f"deadline: {quest.deadline}")
    print(f"capacity: {quest.capacity}")
    print(f"rank: {quest.rank}")
    print(f"overview: {quest.overview}")
    print(f"hunters: {quest.hunters}")
    print(f"completed: {quest.completed}")
    print("-" * 40)