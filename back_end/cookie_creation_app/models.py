from django.db import models
from flavor_app.models import Flavor
from cookie_cutter_app.models import CookieCutter
from topping_app.models import Topping
from decoration_app.models import Decoration

# Create your models here.
class CookieCreation(models.Model):
    name = models.CharField(max_length=255)
    flavor = models.ForeignKey(Flavor, on_delete=models.CASCADE)
    description = models.TextField(default='Add a description to your new creation!')
    cookie_cutter = models.ForeignKey(CookieCutter, on_delete=models.CASCADE)
    topping = models.ForeignKey(Topping, on_delete=models.CASCADE, null=True, blank=True)
    decoration = models.ForeignKey(Decoration, on_delete=models.CASCADE, null=True, blank=True)
    prev_purchased = models.BooleanField(default=False)
    image = models.URLField(max_length=200, null=True, blank=True)