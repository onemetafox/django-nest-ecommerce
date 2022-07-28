from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.models import User

from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from datetime import datetime, timedelta
import random 

# import models 
from .models import UserProfile, BillingAddress, ShippingAddress

class BillingAddressSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(required=True, min_length=8, max_length=20)
    company_name = serializers.CharField(required=True, min_length=3, max_length=80)
    address = serializers.CharField(required=True, min_length=3, max_length=250)
    province = serializers.CharField(required=True, min_length=3, max_length=80)
    postal_code = serializers.CharField(required=True, min_length=4, max_length=8)
    cif = serializers.CharField(max_length=20)
    class Meta:
        model = BillingAddress
        fields = ['slug', 'phone_number', 'company_name', 'address', 'city', 'province', 'postal_code', 'cif', 'created_at', "email", "country" ]

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = ['slug','phone_number','name','address','city','province','postal_code','created_at', 'country' ]
        many = True


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['slug', 'is_email_verified', 'cookies_accepted', 'cookies_version', 'role', 'language', 'phone_number']
    
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all())])
    first_name = serializers.CharField(required=True, min_length=3, max_length=80)
    last_name = serializers.CharField(required=True, min_length=3, max_length=80)
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=False, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=False, min_length=8)
    user_profile = UserProfileSerializer(read_only=True)
    user_shipping_address = ShippingAddressSerializer(many=True, read_only=True)
    user_billing_address = BillingAddressSerializer(read_only=True)

    class Meta:
        model = User
        fields =  ['id' ,'first_name', 'last_name', 'username','email', 'password', 'confirm_password', 'is_active','date_joined','last_login', 'user_profile', 'user_shipping_address', 'user_billing_address']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['email'],
            email = validated_data['email'],
            is_active = validated_data['is_active'],
            date_joined = validated_data['date_joined'],
            # password = validated_data['password'],
        )

        user.set_password(validated_data['password'])
        user.save()

        email_verification_otp = random.randint(1000,9999)
        email_verification_otp_expired_at = datetime.now() + timedelta(minutes=60)
        user_profile_data = { 
            'is_email_verified': False,
            'email_verification_otp': email_verification_otp,
            'email_verification_otp_expired_at': email_verification_otp_expired_at
        }
        user_profile = UserProfile.objects.update(auth_user = user, **user_profile_data)

        return user


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'