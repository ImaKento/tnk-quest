from django.db.models import Sum
import sys
import os
import django

sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from kichi.models import KichiCustomer

def count_customers_by_seating_and_time():
    # time区分ごとに席形態がカウンターの顧客の人数を計算
    bar_customers_by_time = KichiCustomer.objects.filter(seating_preference='bar')\
        .values('time')\
        .annotate(bar_total=Sum('number_of_people'))\
        .order_by('time')
    
    # time区分ごとに席形態がテーブルの顧客の人数を計算
    table_customers_by_time = KichiCustomer.objects.filter(seating_preference='table')\
        .values('time')\
        .annotate(table_total=Sum('number_of_people'))\
        .order_by('time')

    # 結果を出力
    print("Number of people at the bar by time:")
    for entry in bar_customers_by_time:
        print(f"{entry['time']}: {entry['bar_total']}")
        
    print("Number of people at the table by time:")
    for entry in table_customers_by_time:
        print(f"{entry['time']}: {entry['table_total']}")

count_customers_by_seating_and_time()
