First File





TO DO BEFORE FINAL 

VALIDATIONS:

--models.py for: cookie_creation, cookie_cutter, deocration, flavor, topping, user_app

--views.py for: user_app




Test User Logins:

post: http://127.0.0.1:8000/api/v1/users/login/

{"email": "fr@fr.com", "password":"fr"}

{
  "token": "7c59a258a383d53f25be0311236148fcd4035959",
  "client": "fr@fr.com"
}