from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from mailchimp_marketing import Client
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_500_INTERNAL_SERVER_ERROR,
)
from .mailchimp_service import MailchimpService
from user_app.views import TokenReq

# Create your views here.


class Subscribe(TokenReq):
    def post(self, request):
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        
        if not email:
            return Response({"error": "Email is required"}, status=400)
        
        mailchimp_service = MailchimpService()
        result = mailchimp_service.add_member_to_list(email, first_name, last_name)
        
        if result:
            return Response({"message": "Successfully subscribed"}, status=200)
        else:
            return Response({"error": "Failed to subscribe"}, status=400)
        

class Unsubscribe(TokenReq):
    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response({"error": "Email is required"}, status=400)
        
        mailchimp_service = MailchimpService()
        result = mailchimp_service.unsubscribe_member(email)
        
        if result:
            return Response({"message": "Successfully unsubscribed"}, status=200)
        else:
            return Response({"error": "Failed to unsubscribe"}, status=400)
        

class DeleteMember(TokenReq):
    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response({"error": "Email is required"}, status=400)
        
        mailchimp_service = MailchimpService()
        result = mailchimp_service.delete_member_from_list(email)
        
        if result:
            return Response({"message": "Successfully deleted"}, status=200)
        else:
            return Response({"error": "Failed to delete"}, status=400)