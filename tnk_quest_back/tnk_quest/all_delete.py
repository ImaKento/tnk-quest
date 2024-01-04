import os
import django
import sys

sys.path.append('/app')  # Adjust this path to the actual path of your Django project
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import KichiCustomer

# Delete all instances of KichiCustomer
KichiCustomer.objects.all().delete()

print("All KichiCustomer records have been deleted.")
