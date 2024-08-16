from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .openai_service import OpenAIService
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from user_app.views import TokenReq

# Create your views here.

class ChatGPTQuery(TokenReq):
    def post(self, request):
        prompt = request.data.get('prompt')
        
        if not prompt:
            return Response({"error": "Prompt is required"}, status=400)
        
        openai_service = OpenAIService()
        response_text = openai_service.generate_response(prompt)

        print("response_text: ", response_text)
        
        if response_text:
            return Response({"response": response_text}, status=200)
        else:
            return Response({"error": "Failed to get response from OpenAI"}, status=500)
