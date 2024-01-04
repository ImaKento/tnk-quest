import os
import django
import sys

sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import KichiCustomer

# 削除したいレコードのIDを指定します。
customer_id_to_delete = 69

# 指定されたIDを持つレコードを検索します。
try:
    # get() メソッドは、該当するレコードがない場合に DoesNotExist 例外を発生させます。
    customer_to_delete = KichiCustomer.objects.get(id=customer_id_to_delete)
    
    # レコードが見つかったら削除します。
    customer_to_delete.delete()
    print(f"Customer with id {customer_id_to_delete} has been deleted.")
except KichiCustomer.DoesNotExist:
    print(f"No customer found with id {customer_id_to_delete}.")
