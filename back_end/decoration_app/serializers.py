# serializers.py

from rest_framework import serializers
from .models import Decoration

class DecorationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decoration
        fields = '__all__'
