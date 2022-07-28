from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from datetime import datetime, timedelta
from django.utils import timezone

import jwt
from django.conf import settings

# import serializers
from .serializers import SignupSerializer, ValidateEmailSerializer, LoginSerializer

# Signup
class SignupView(APIView):
    permission_classes = (AllowAny, )
    signup_serializer_class = SignupSerializer
    def post(self, request, format=None):
        signup_serializer = self.signup_serializer_class(data=request.data)
        signup_serializer.is_valid(raise_exception=True)
        user = signup_serializer.save()

        return Response({"message": "User registration completed successfully."}, status=status.HTTP_201_CREATED)

# Login
class LoginView(APIView):
    permission_classes = (AllowAny, )
    login_serializer_class = LoginSerializer
    def post(self, request, format=None):
        serializer = self.login_serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.login()

        token = RefreshToken.for_user(user)
        
        jwt_access_token_lifetime =  settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] # .SIMPLE_JWT.ACCESS_TOKEN_LIFETIME
        jwt_refresh_token_lifetime =  settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] # .SIMPLE_JWT.ACCESS_TOKEN_LIFETIME
        data = {
          "refresh": str(token),
          "access": str(token.access_token),
          "access_token_life_time_in_seconds" : jwt_access_token_lifetime.total_seconds(),
          "refresh_token_life_time_in_seconds" : jwt_refresh_token_lifetime.total_seconds(),
        }
        return Response(data, status=status.HTTP_200_OK)

# Logout
class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh = request.data.get('refresh')
            token = RefreshToken(refresh)
            token.blacklist()
            return Response({"message": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"message": "Logout operation failed."}, status=status.HTTP_400_BAD_REQUEST)
