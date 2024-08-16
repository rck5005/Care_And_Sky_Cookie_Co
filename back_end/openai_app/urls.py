from django.urls import path
from .views import ChatGPTQuery

urlpatterns = [
    path('', ChatGPTQuery.as_view(), name='chatgpt'),
]