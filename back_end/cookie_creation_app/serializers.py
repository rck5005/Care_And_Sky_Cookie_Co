from rest_framework import serializers
from .models import CookieCreation
from flavor_app.models import Flavor
from cookie_cutter_app.models import CookieCutter
from topping_app.models import Topping
from decoration_app.models import Decoration
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

class CookieCreationPKSerializer(serializers.ModelSerializer):
    flavor = serializers.PrimaryKeyRelatedField(queryset=Flavor.objects.all())
    cookie_cutter = serializers.PrimaryKeyRelatedField(queryset=CookieCutter.objects.all())
    topping = serializers.PrimaryKeyRelatedField(queryset=Topping.objects.all(), required=False, allow_null=True)
    decoration = serializers.PrimaryKeyRelatedField(queryset=Decoration.objects.all(), required=False, allow_null=True)

    class Meta:
        model = CookieCreation
        fields = '__all__'
