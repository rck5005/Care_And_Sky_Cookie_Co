from django.urls import path
from .views import AllDecorationsView

urlpatterns = [
        path("", AllDecorationsView.as_view()),
]