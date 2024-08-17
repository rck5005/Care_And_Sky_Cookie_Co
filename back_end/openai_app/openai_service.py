from openai import OpenAI

from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class OpenAIService:
    def __init__(self):
        pass

    def generate_response(self, prompt, model="gpt-4o-mini", max_tokens_here = 50):
        try:
            response = client.chat.completions.create(
                model=model, 
                messages=[
                    {"role": "system", "content": "You are a cookie connoisseur. You talk like Martha Stewart"},
                    {
                        "role": "user", 
                        "content": prompt
                    }
                ],
                max_tokens = max_tokens_here
            )
            return (response.choices[0].message)

        except Exception as e:
            # Handle general errors
            print(f"General error: {e}")
            return None