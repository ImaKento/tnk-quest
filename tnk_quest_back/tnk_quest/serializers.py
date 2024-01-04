from rest_framework import serializers

import os
import django
import sys
sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()

from tnk_quest.models import Hunters, Quests, Achievement

class HuntersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hunters
        fields = '__all__'
        
class QuestsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quests
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'