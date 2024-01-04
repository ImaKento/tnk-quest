from cryptography.fernet import Fernet

# Fernet暗号化用のキーを生成
FERNET_SECRET_KEY = Fernet.generate_key().decode()

# settings.pyに追加
# 実際の運用では、このキーは安全に管理されるべきです（例: 環境変数）
