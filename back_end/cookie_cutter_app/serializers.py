# serializers.py

from rest_framework import serializers
from .models import CookieCutter

class CookieCutterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CookieCutter
        fields = '__all__'