from django.urls import path
from .views import PublicCookieCreationsView, CreationPurchased, CreateNewCreation

urlpatterns = [
        path("all/", PublicCookieCreationsView.as_view()),
        path("purchased/<int:pk>/", CreationPurchased.as_view()),
        path("create/", CreateNewCreation.as_view()),
]