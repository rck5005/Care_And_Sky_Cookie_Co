from django.urls import path
from .views import AllFlavorsView

urlpatterns = [
        path("", AllFlavorsView.as_view()),
]