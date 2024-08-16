from django.db import models
from cookie_creation_app.models import CookieCreation
from user_app.models import User

# Create your models here.
class UsersCookieCreation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cookie_creation = models.ForeignKey(CookieCreation, on_delete=models.CASCADE)
    is_favorite = models.BooleanField(default=False)