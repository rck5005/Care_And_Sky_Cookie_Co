from rest_framework import serializers
from .models import UsersCookieCreation
from cookie_creation_app.serializers import CookieCreationSerializer
from user_app.serializers import UserSerializer

class UsersCookieCreationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    cookie_creation = CookieCreationSerializer(read_only=True)
    
    class Meta:
        model = UsersCookieCreation
        fields = ['user', 'cookie_creation', 'is_favorite']
