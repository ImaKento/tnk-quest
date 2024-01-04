import os
import sys
import django

# Djangoプロジェクトの設定を読み込む
sys.path.append('/app')  # Djangoプロジェクトのパスを正確に設定してください
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import StaffAccessPassword  # yourappは適切なアプリケーション名に置き換えてください

# パスワードのリスト（例として、実際のセキュリティに注意してください）
passwords = ["kichi_staff"]

# 各パスボードを暗号化して保存
for pwd in passwords:
    encrypted_password = StaffAccessPassword(password=pwd)
    encrypted_password.save()

print("パスワードがデータベースに追加されました。")
