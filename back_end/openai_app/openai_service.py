from openai import OpenAI

from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class OpenAIService:
    def __init__(self):
        pass

    def generate_response(self, prompt, model="gpt-4o-mini"):
        try:
            response = client.chat.completions.create(
                model=model, 
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {
                        "role": "user", 
                        "content": "Write a haiku about recursion in programming."
                    }
                ]
            )
            return (response.choices[0].text.message)

        except Exception as e:
            # Handle general errors
            print(f"General error: {e}")
            return None