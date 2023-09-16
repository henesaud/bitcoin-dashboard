from django.urls import path
from tools.views import PublicKeyConverter, PublicKeyTypes

urlpatterns = [
    path("pk_converter", PublicKeyConverter.as_view(), name="public_key_converter"),
    path("pk_types", PublicKeyTypes.as_view(), name="public_key_types"),
]
