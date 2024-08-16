from django.urls import path
from .views import PublicCookieCreationsView, CreationPurchased

urlpatterns = [
        path("all/", PublicCookieCreationsView.as_view()),
        path("update/<int:pk>/", CreationPurchased.as_view()),
]