from django.urls import path
from tools.views import ConvertPublicKey

urlpatterns = [
    path("pk_converter", ConvertPublicKey.as_view(), name="public_key_converter"),
]
