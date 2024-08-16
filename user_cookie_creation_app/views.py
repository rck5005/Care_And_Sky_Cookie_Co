from django.shortcuts import render
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from user_app.views import TokenReq
from .models import UsersCookieCreation
from .serializers import UsersCookieCreationSerializer

# Create your views here.

class AllUsersCreations(TokenReq):
    def get(self, request):
        try:
            ruser = request.user
            users_cookie_creations = UsersCookieCreation.objects.filter(user=ruser).order_by("id")
            serializer = UsersCookieCreationSerializer(users_cookie_creations, many=True)

            return Response(serializer.data, status=HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)
        
class AllUsersFavorites(TokenReq):
    def get(self, request):
        try:
            ruser = request.user
            users_favorites = UsersCookieCreation.objects.filter(user=ruser, is_favorite=True).order_by("id")
            serializer = UsersCookieCreationSerializer(users_favorites, many=True)

            return Response(serializer.data, status=HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)

# class AddCreationToFavorites(TokenReq):
#     def put(self, request, pk):
#         try:
#             cookie_creation = CookieCreation.objects.get(pk=pk)
#         except CookieCreation.DoesNotExist:
#             return Response({'error': 'Cookie creation not found.'}, status=HTTP_400_BAD_REQUEST)
        
#         cookie_creation.prev_purchased = True
        
#         serializer = CookieCreationSerializer(cookie_creation, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=HTTP_200_OK)
#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)