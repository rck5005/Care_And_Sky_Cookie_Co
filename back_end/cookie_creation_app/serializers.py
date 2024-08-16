from rest_framework import serializers
from .models import CookieCreation
from flavor_app.serializers import FlavorSerializer
from cookie_cutter_app.serializers import CookieCutterSerializer
from topping_app.serializers import ToppingSerializer
from decoration_app.serializers import DecorationSerializer

class CookieCreationSerializer(serializers.ModelSerializer):
    flavor = FlavorSerializer()
    cookie_cutter = CookieCutterSerializer()
    topping = ToppingSerializer()
    decoration = DecorationSerializer()


    class Meta:
        model = CookieCreation
        fields = '__all__'