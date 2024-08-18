from django.db import models

# Create your models here.

class Flavor(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.URLField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)