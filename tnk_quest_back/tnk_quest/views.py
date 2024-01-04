from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.db.models import Sum
from django.http import JsonResponse
from django.utils.dateparse import parse_datetime
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from cryptography.fernet import Fernet, InvalidToken
from django.conf import settings

import sys
import os
import django

sys.path.append('/app')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')
django.setup()


from tnk_quest.models import Hunters, Quests, Achievement
from tnk_quest.serializers import HuntersSerializer, QuestsSerializer, AchievementSerializer


@api_view(['POST'])
def signup(request):
    try:
        username = request.data.get('username')
        password = make_password(request.data.get('password'))

        if not username or not password:
            return Response({'message': 'ユーザー名とパスワードは必須です。'}, status=status.HTTP_400_BAD_REQUEST)

        user = Hunters.objects.create(user_name=username, password=password)
        return Response({'message': 'アカウントが作成されました。', 'user': user.user_name}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def login(request):
    username = request.data.get('username', None)
    password = request.data.get('password', None)

    if username and password:
        # すべてのユーザーデータをシリアライズ
        users = Hunters.objects.all()
        serialized_users = HuntersSerializer(users, many=True).data

        # ユーザー名が一致するユーザーのデータを探す
        matching_users = [user for user in serialized_users if user['user_name'] == username]

        if matching_users:
            # パスワードの検証
            user = matching_users[0]  # ユーザー名は一意である前提
            if check_password(password, user['password']):
                return Response({'message': 'ログイン成功', 'user': user['user_name']})
            else:
                return Response({'error': 'パスワードが間違っています'}, status=401)
        else:
            return Response({'error': 'ユーザーが見つかりません'}, status=404)
    else:
        return Response({'error': 'ユーザー名とパスワードを指定してください'}, status=400)
    
@api_view(['GET'])
def get_quest(request):
    quests = Quests.objects.all()
    serializer = QuestsSerializer(quests, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_quest(request):
    data = request.data.copy()
    # 'deadline' を正しい日時形式に変換
    if 'deadline' in data and data['deadline']:
        data['deadline'] = parse_datetime(data['deadline'])

    # 'capacity' を整数に変換
    if 'capacity' in data and data['capacity']:
        data['capacity'] = int(data['capacity'])

    serializer = QuestsSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def delete_quest(request, quest_id):
    try:
        quest = Quests.objects.get(id=quest_id)
        quest.delete()
        return JsonResponse({'message': 'Quest deleted successfully'}, status=status.HTTP_200_OK)
    except Quests.DoesNotExist:
        return JsonResponse({'error': 'Quest not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['DELETE'])
def delete_hunter(request, user_name):
    try:
        hunter = Hunters.objects.get(user_name=user_name)
        hunter.delete()
        return JsonResponse({'message': 'Hunter deleted successfully'}, status=status.HTTP_200_OK)
    except Hunters.DoesNotExist:
        return JsonResponse({'error': 'Hunter not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def accept_quest(request):
    quest_id = request.data.get('quest_id')
    hunter_name = request.data.get('hunter_name')

    try:
        quest = Quests.objects.get(id=quest_id)
        existing_hunters = quest.hunters.split(' ') if quest.hunters else []

        # 名前の重複をチェック
        if hunter_name in existing_hunters:
            return JsonResponse({'error': 'This hunter has already accepted the quest'}, status=400)

        # 名前を追加
        if quest.hunters:
            quest.hunters += f" {hunter_name}"
        else:
            quest.hunters = hunter_name
        quest.save()
        return JsonResponse({'message': 'Quest accepted successfully'})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Quest not found'}, status=404)
    
@api_view(['PUT'])
def update_quest(request, pk):
    try:
        quest = Quests.objects.get(pk=pk)
        data = request.data

        # serializersを使ってデータの妥当性をチェックし、更新
        serializer = QuestsSerializer(quest, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        print(serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Quests.DoesNotExist:
        return JsonResponse({'error': 'クエストが見つかりません'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def complete_quest(request):
    quest_id = request.data.get('quest_id')

    try:
        # クエストの取得
        quest = Quests.objects.get(id=quest_id)
        
        # クエストのcompletedをTrueに設定
        quest.completed = True
        quest.save()

        # quest.huntersに格納されているハンター名のリストを取得
        hunter_names = quest.hunters.split()
        
        # 各ハンターに対してAchievementを作成
        for hunter_name in hunter_names:
            hunter = Hunters.objects.get(user_name=hunter_name)
            Achievement.objects.create(
                hunter=hunter,
                quest_title=quest.title,
                quest_rank=quest.rank
            )

        return Response({'message': 'クエストが全ハンターに対して完了として記録されました。'})

    except Quests.DoesNotExist:
        return Response({'error': 'クエストが見つかりません。'}, status=404)
    except Hunters.DoesNotExist:
        return Response({'error': 'ハンターが見つかりません。'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    
@api_view(['GET'])
def get_achievements(request, hunter_name):
    try:
        # ハンターを取得
        hunter = Hunters.objects.get(user_name=hunter_name)

        # 関連する実績を取得
        achievements = Achievement.objects.filter(hunter=hunter)

        # 実績データをシリアライズ
        data = [{"quest_title": a.quest_title, "quest_rank": a.quest_rank} for a in achievements]

        return JsonResponse(data, safe=False)
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'ハンターが見つかりません。'}, status=404)
    
@api_view(['GET'])
def get_hunters(request):
    # Hunters モデルの全インスタンスを取得
    hunters = Hunters.objects.all()
    # user_name 属性のみをリストに格納
    hunter_names = [hunter.user_name for hunter in hunters]
    # JSON レスポンスとして hunter_names を返す
    return JsonResponse(hunter_names, safe=False)