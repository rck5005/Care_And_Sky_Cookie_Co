from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'display_name', 'address', 'first_name', 'last_name']
        extra_kwargs = {
            'email': {'write_only': True},
            'username': {'required': False, 'allow_blank': True},
        }
