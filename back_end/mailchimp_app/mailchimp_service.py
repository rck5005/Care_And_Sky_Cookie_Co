from mailchimp_marketing import Client
from django.conf import settings

class MailchimpService:
    def __init__(self):
        self.client = Client()
        self.client.set_config({
            "api_key": settings.MAILCHIMP_API_KEY,
            "server": settings.MAILCHIMP_SERVER_PREFIX
        })

    def add_member_to_list(self, email, first_name=None, last_name=None):
        list_id = settings.MAILCHIMP_LIST_ID
        try:
            response = self.client.lists.add_list_member(list_id, {
                "email_address": email,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": first_name,
                    "LNAME": last_name
                }
            })
            return response
        except Exception as e:
            print("Error adding member to Mailchimp list: ", {e})
            return None
    

    def unsubscribe_member(self, email):
        list_id = settings.MAILCHIMP_LIST_ID
        try:
            response = self.client.lists.update_list_member(list_id, self._get_subscriber_hash(email), {
                "status": "unsubscribed"
            })
            return response
        except Exception as e:
            print("Error unsubscribing member from Mailchimp list: ", {e})
            return None
        

    def delete_member_from_list(self, email):
        list_id = settings.MAILCHIMP_LIST_ID
        subscriber_hash = self._get_subscriber_hash(email)
        try:
            response = self.client.lists.delete_list_member(list_id, subscriber_hash)
            return response
        except Exception as e:
            print("Error deleting member from Mailchimp list: ", {e})
            return None


    def _get_subscriber_hash(self, email):
        # Mailchimp uses an MD5 hash of the email address to identify subscribers
        import hashlib
        return hashlib.md5(email.lower().encode('utf-8')).hexdigest()