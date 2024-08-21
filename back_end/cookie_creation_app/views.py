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
from .models import CookieCreation
from .serializers import CookieCreationSerializer, CookieCreationPKSerializer

# Create your views here.

class PublicCookieCreationsView(TokenReq):
    def get(self, request):
        try:
            cookie_creations = CookieCreation.objects.filter(prev_purchased=True).order_by("id")
            serializer = CookieCreationSerializer(cookie_creations, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)

class CreationPurchased(TokenReq):
    def put(self, request, pk):
        try:
            cookie_creation = CookieCreation.objects.get(pk=pk)
        except CookieCreation.DoesNotExist:
            return Response({'error': 'Cookie creation not found.'}, status=HTTP_400_BAD_REQUEST)
        
        cookie_creation.prev_purchased = True
        
        serializer = CookieCreationSerializer(cookie_creation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
class CreateNewCreation(TokenReq):
    def post(self, request):
        try:
            serializer = CookieCreationPKSerializer(data=request.data)
            # print("serializer: ", serializer)
        
            if serializer.is_valid():
                serializer.save()
                #add to user by sending request to AddRemoveCreation
                return Response(serializer.data, status=HTTP_201_CREATED)
            else:
                # Return validation errors if serializer is not valid
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except ValidationError as e:
            return Response(e.messages, status=HTTP_400_BAD_REQUEST)