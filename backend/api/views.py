import json

from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from rest_framework import authentication
from rest_framework import status as drf_status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView


def get_csrf(request):
    response = Response({"detail": "CSRF cookie set"})
    response["X-CSRFToken"] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("username")
    password = data.get("password")

    if username is None or password is None:
        return Response(
            {"detail": "Please provide username and password."},
            status=drf_status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"detail": "Invalid credentials."}, status=drf_status.HTTP_400_BAD_REQUEST
        )

    login(request, user)
    return Response({"detail": "Successfully logged in."})


def logout_view(request):
    if not request.user.is_authenticated:
        return Response(
            {"detail": "You're not logged in."}, status=drf_status.HTTP_400_BAD_REQUEST
        )

    logout(request)
    return Response({"detail": "Successfully logged out."})


class SessionView(APIView):
    authentication_classes = [
        authentication.SessionAuthentication,
        authentication.BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return Response({"isAuthenticated": True})


class WhoAmIView(APIView):
    authentication_classes = [
        authentication.SessionAuthentication,
        authentication.BasicAuthentication,
    ]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        return Response({"username": request.user.username})
