from django.contrib.auth.models import User
from django.db.models import Q
from django.contrib import auth
from django.core.exceptions import ValidationError
from django.contrib.auth import password_validation
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from datetime import datetime, timedelta

import jwt
from django.conf import settings
import random 

# signup serializer
class SignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True, min_length=3, max_length=80)
    last_name = serializers.CharField(required=True, min_length=3, max_length=80)
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, min_length=8)
    confirm_password = serializers.CharField(required=True, min_length=8)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password', 'confirm_password')

    def validate_confirm_password(self, value):
        if value != self.initial_data['password']:
            raise serializers.ValidationError("Incorrect password", code='invalid')
        return value
    
    def clean(self):
        errors={}
        self.raise_validation_error(errors)

    # raise validation error
    def raise_validation_error(self, errors = {}):
        error_filter = {k: v for k, v in errors.items() if v is not None }
        errors.clear()
        errors.update(error_filter)
        if errors:
            raise ValidationError(errors, code='invalid')

    def create(self, validated_data):
        self.clean()
        confirm_password = validated_data.pop('confirm_password')
        
        user = User.objects.create_user(**validated_data)
        # email_verification_otp = random.randint(1000,9999)
        # email_verification_otp_expired_at = datetime.now() + timedelta(minutes=60)
        # user_profile_data = { 
        #     'is_email_verified': False,
        #     'email_verification_otp': email_verification_otp,
        #     'email_verification_otp_expired_at': email_verification_otp_expired_at
        # }
        # user_profile = Profile.objects.create(user = user, **user_profile_data)
        # return user
        return True

# validate email serializer
class ValidateEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=250, write_only=True)

# login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(min_length=6, max_length=64, write_only=True, required=True)

    def login(self, **kwargs):
        username = self.validated_data['username']
        password = self.validated_data['password']

        # Accept both username and email 
        user = User.objects.filter(Q(username=username) | Q(email=username)).first()
        if not user:
            raise serializers.ValidationError({"detail": "No active account found with the given credentials."})

        user = auth.authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError({"detail": "No active account found with the given credentials."})
        return user
