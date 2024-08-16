from django.urls import path
from .views import AllToppingsView

urlpatterns = [
        path("", AllToppingsView.as_view()),
]