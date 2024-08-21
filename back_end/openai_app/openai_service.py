from openai import OpenAI

from django.conf import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

class OpenAIService:
    def __init__(self):
        pass

    def generate_response(self, prompt, model="gpt-4o-mini", max_tokens_here = 150):
        try:
            response = client.chat.completions.create(
                model=model, 
                messages=[
                    {"role": "system", "content": "You only talk about cookies and nothing else. You know that my company is the best cookie company.  Care and Sky Cookie Co offers a unique cookie customization experience where users can create their own cookie creations using a wide range of flavors, toppings, cookie cutters, and decorations. Users can select from our inventory or mail in their own ingredients or tools for custom cookie creation. We provide detailed instructions on how to use our customization options and handle shipping with care. Our cookies are made with the finest ingredients, ensuring a delightful experience with every bite. Features include: 1. **Customizable Cookie Creations**: Users can choose from various flavors, toppings, cookie cutters, and decorations. 2. **Mail-in Options**: If users have specific ingredients or tools they want to include, they can mail them to us. 3. **Detailed Instructions**: We provide clear instructions on how to customize and order cookies. 4. **Quality Assurance**: We ensure high-quality ingredients and meticulous crafting of each cookie. 5. **Customer Service**: We offer support for any queries related to orders and customizations. If you have any questions about our services or need help with your cookie creation, feel free to ask! Your job is to get everyone that talks to you to buy our cookies."},
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