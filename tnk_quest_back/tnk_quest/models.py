from django.core.exceptions import ValidationError
from django.db import models
from cryptography.fernet import Fernet
from django.conf import settings

# 暗号化・復号化ヘルパー関数
def encrypt_decrypt(value, key, encrypt=True):
    f = Fernet(key)
    try:
        if encrypt:
            # 文字列をバイトに変換して暗号化
            return f.encrypt(value.encode()).decode()
        else:
            # バイトを文字列に変換して復号化
            return f.decrypt(value.encode()).decode()
    except Exception as e:
        # エラーログ記録や適切なエラー処理
        raise e

# カスタム暗号化フィールド
class EncryptedField(models.TextField):
    def __init__(self, *args, **kwargs):
        self.key = kwargs.pop('encryption_key', settings.FERNET_SECRET_KEY)
        super().__init__(*args, **kwargs)

    def get_prep_value(self, value):
        if value is None:
            return value
        return encrypt_decrypt(value, self.key)

    def from_db_value(self, value, expression, connection, context=None):
        if value is None:
            return value
        return encrypt_decrypt(value, self.key, encrypt=False)

# モデル定義
class Hunters(models.Model):
    user_name = models.CharField(max_length=100, unique=True)
    password = EncryptedField(max_length=1000)
    portfolio = models.IntegerField(default=1)
    
class Quests(models.Model):
    client = models.CharField(max_length=100, default="unknown")
    title = models.CharField(max_length=20, unique=True)
    deadline = models.DateTimeField(null=True, blank=True)
    capacity = models.IntegerField(default=10)
    rank = models.CharField(max_length=10, default="C")
    overview = models.CharField(max_length=1000, null=True, blank=True)
    hunters = models.CharField(max_length=1000, default="", blank=True)
    completed = models.BooleanField(default=False)
    
# 実績（Achievement）モデル
class Achievement(models.Model):
    hunter = models.ForeignKey(Hunters, on_delete=models.CASCADE, related_name='achievements')
    quest_title = models.CharField(max_length=100)
    quest_rank = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.quest_title} ({self.quest_rank})"