from django.urls import path
from .views import AllUsersCreations , RemoveCreation, AllUsersFavorites , AdjustFavorites

urlpatterns = [
        path("all/", AllUsersCreations.as_view()),
        path("remove/<int:cookie_creation_id>/", RemoveCreation.as_view()),
        path("favorites/", AllUsersFavorites.as_view()),
        path("adjustfavorites/<int:cookie_creation_id>/", AdjustFavorites.as_view()),
]