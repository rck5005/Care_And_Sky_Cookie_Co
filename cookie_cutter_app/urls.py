from django.urls import path
from .views import AllCookieCuttersView

urlpatterns = [
        path("", AllCookieCuttersView.as_view()),
]