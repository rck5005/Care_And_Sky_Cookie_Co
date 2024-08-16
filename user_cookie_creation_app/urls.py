from django.urls import path
from .views import AllUsersCreations , AllUsersFavorites #, AddCreationToFavorites

urlpatterns = [
        path("all/", AllUsersCreations.as_view()),
        path("favorites/", AllUsersFavorites.as_view()),
        # path("add/", AddCreationToFavorites.as_view()),
]