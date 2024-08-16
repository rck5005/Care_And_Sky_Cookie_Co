from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import User

# Create your views here.
class Sign_up(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("username", request.data.get("email"))
        new_user = User(**data)
        try:
            new_user.full_clean()
            new_user.set_password(data.get("password"))
            new_user.save()
            login(request, new_user)
            token = Token.objects.create(user = new_user)
            return Response({"user":new_user.email,"token":token.key}, status=HTTP_201_CREATED)
        except ValidationError as e:
            print(e)
            return Response(e.messages, status=HTTP_400_BAD_REQUEST)

class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data['username'] = request.data.get("username", request.data.get("email"))
        user = authenticate(username=data.get("username"), password=data.get("password"))
        if(user):
            login(request, user)
            token, created = Token.objects.get_or_create(user = user)
            return Response({"token":token.key, "client":user.email}, status=HTTP_200_OK)
        return Response("No user matching credentials", status=HTTP_400_BAD_REQUEST)
    
class TokenReq(APIView):

    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]


class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)
        
class Info(TokenReq):
    def get(self, request):
        try:
            return Response({
                "email":request.user.email
                }, status=HTTP_200_OK)
            # return Response({"email":user.email}, status=HTTP_200_OK)
        except ValidationError as e:
            print(e)
            return Response(e.messages, status=HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        try:
            #check for display_name and address
            data = request.data.copy()
            ruser = request.user
            ruser.display_name = data.get("display_name", ruser.display_name)
            ruser.address = data.get("address", ruser.address)

            #authenticate credential and update if authenticated
            cur_pass = data.get("password")
            if cur_pass and data.get("new_password"):
                auth_user = authenticate(username = ruser.username, password = cur_pass)
                if auth_user == ruser:
                    ruser.set_password(data.get("new_password"))

            
            #save password
            ruser.full_clean()
            ruser.save()
            return Response({"display_name": ruser.display_name, "address":ruser.address})
        except ValidationError as e:
            print(e)
            return Response(e.messages, status=HTTP_400_BAD_REQUEST)
    
class Delete(TokenReq):
    def delete(self, request):
        try:
            user = request.user
            user.delete()
            return Response({"message": "User deleted successfully."}, status=HTTP_204_NO_CONTENT)
        except ValidationError as e:
            print(e)
            return Response(e.messages, status=HTTP_400_BAD_REQUEST)
