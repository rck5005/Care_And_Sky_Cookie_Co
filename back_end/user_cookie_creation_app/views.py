from django.shortcuts import render
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from user_app.views import TokenReq
from .models import UsersCookieCreation, CookieCreation
from .serializers import UsersCookieCreationSerializer

# Create your views here.

class AllUsersCreations(TokenReq):
    def get(self, request):
        try:
            ruser = request.user
            users_cookie_creations = UsersCookieCreation.objects.filter(user=ruser).order_by("id")
            serializer = UsersCookieCreationSerializer(users_cookie_creations, many=True)

            return Response(serializer.data, status=HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)
        
class AddRemoveCreation(TokenReq):
    
    def post(self, request, cookie_creation_id):
        try:
            ruser = request.user
            cookie_creation = CookieCreation.objects.get(id=cookie_creation_id)
            
            # Try to get the existing UsersCookieCreation instance for the user and cookie creation
            user_cookie_creation, created = UsersCookieCreation.objects.get_or_create(
                user=ruser,
                cookie_creation=cookie_creation
            )
            
            if not created:
                return Response({'message': 'This cookie creation is already added.'}, status=HTTP_200_OK)
            
            # Serialize the newly created entry
            serializer = UsersCookieCreationSerializer(user_cookie_creation)
            
            return Response(serializer.data, status=HTTP_200_OK)
        
        except CookieCreation.DoesNotExist:
            return Response({'error': 'Cookie creation not found.'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)
        

    def delete(self, request, cookie_creation_id):
        try:
            ruser = request.user
            cookie_creation = CookieCreation.objects.get(id=cookie_creation_id)
            
            # Try to get the existing UsersCookieCreation instance
            user_creation = UsersCookieCreation.objects.filter(
                user=ruser,
                cookie_creation=cookie_creation
            ).first()
            
            if user_creation:
                #seeing if instance of cookie creation was prev_purchased, hence should be kept in database
                if user_creation.cookie_creation.prev_purchased == False:
                    user_creation.cookie_creation.delete()
                    return Response({"message": "Creation deleted successfully."}, status=HTTP_204_NO_CONTENT)
                else:
                    # If the instance should be kept in database
                    user_creation.delete()
                    return Response({"message": "Creation removed from user."}, status=HTTP_204_NO_CONTENT)
                
            else:
                return Response({'error': 'Cookie creation not found.'}, status=HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)
        
class AllUsersFavorites(TokenReq):
    def get(self, request):
        try:
            ruser = request.user
            users_favorites = UsersCookieCreation.objects.filter(user=ruser, is_favorite=True).order_by("id")
            serializer = UsersCookieCreationSerializer(users_favorites, many=True)

            return Response(serializer.data, status=HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)

class AdjustFavorites(TokenReq):
    def post(self, request, cookie_creation_id):
        try:
            ruser = request.user
            cookie_creation = CookieCreation.objects.get(id=cookie_creation_id)
            
            # Try to get the existing UsersCookieCreation instance
            user_favorite = UsersCookieCreation.objects.filter(
                user=ruser,
                cookie_creation=cookie_creation
            ).first()
            
            if user_favorite:
                # If the instance exists, update is_favorite to True
                user_favorite.is_favorite = True
                user_favorite.save()
            else:
                # If the instance does not exist, create a new one
                user_favorite = UsersCookieCreation.objects.create(
                    user=ruser,
                    cookie_creation=cookie_creation,
                    is_favorite=True
                )
            
            # Serialize the updated favorite entry
            serializer = UsersCookieCreationSerializer(user_favorite)
            
            return Response(serializer.data, status=HTTP_200_OK)
        
        except CookieCreation.DoesNotExist:
            return Response({'error': 'Cookie creation not found.'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)
        
    def put(self, request, cookie_creation_id):
        try:
            ruser = request.user
            cookie_creation = CookieCreation.objects.get(id=cookie_creation_id)
            
            # Try to get the existing UsersCookieCreation instance
            user_favorite = UsersCookieCreation.objects.filter(
                user=ruser,
                cookie_creation=cookie_creation
            ).first()
            
            if user_favorite:
                if user_favorite.is_favorite == False:
                    return Response({'error': 'User Cookie Creation exists but was not a favorite.'}, status=HTTP_400_BAD_REQUEST)
                else:
                    # If the instance exists, update is_favorite to False
                    user_favorite.is_favorite = False
                    user_favorite.save()
                    return Response(status=HTTP_200_OK)
            else:
                return Response({'error': 'Cookie creation not found.'}, status=HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_400_BAD_REQUEST)