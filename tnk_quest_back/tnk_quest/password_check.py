import sys
import os
import django

sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import WebsiteAccessPassword
from kichi.serializers import WebsiteAccessPasswordSerializer

record = WebsiteAccessPassword.objects.first()
print(record.password)