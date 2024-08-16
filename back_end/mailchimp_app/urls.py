from django.urls import path
from .views import Subscribe, Unsubscribe, DeleteMember

urlpatterns = [
    path('subscribe/', Subscribe.as_view(), name='mailchimp-subscribe'),
    path('unsubscribe/', Unsubscribe.as_view(), name='mailchimp-unsubscribe'),
    path('deletemember/', DeleteMember.as_view(), name='mailchimp-delete'),
]
