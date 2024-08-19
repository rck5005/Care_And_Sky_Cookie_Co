from django.urls import path
from .views import AllUsersCreations , AddRemoveCreation, AllUsersFavorites , AdjustFavorites

urlpatterns = [
        path("all/", AllUsersCreations.as_view()),
        path("addremove/<int:cookie_creation_id>/", AddRemoveCreation.as_view()),
        path("favorites/", AllUsersFavorites.as_view()),
        path("adjustfavorites/<int:cookie_creation_id>/", AdjustFavorites.as_view()),
]