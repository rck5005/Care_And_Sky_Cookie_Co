from django.shortcuts import render
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from user_app.views import TokenReq
from .models import Flavor
from .serializers import FlavorSerializer

# Create your views here.

class AllFlavorsView(TokenReq):
    def get(self, request):
        try:
            flavors = Flavor.objects.order_by("id")
            serializer = FlavorSerializer(flavors, many=True)
            return Response(serializer.data, status=HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)