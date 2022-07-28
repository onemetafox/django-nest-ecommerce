
from djoser import utils
from django.contrib.auth.models import User
from django.db.models import Q
from django.contrib import auth
from django.core.exceptions import ValidationError
from rest_framework import serializers, exceptions
from rest_framework.validators import UniqueValidator

from user.models import UserProfile


# activation serializer

class UidAndTokenSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    language = serializers.CharField(required=False)

    default_error_messages = {
        "invalid_token": 'Activation token is invalid.',
        "invalid_uid": 'User with given uid does not exist.',
    }

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        # uid validation have to be here, because validate_<field_name>
        # doesn't work with modelserializer
        try:
            uid = utils.decode_uid(self.initial_data.get("uid", ""))
            self.user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            key_error = "invalid_uid"
            raise ValidationError(
                {"uid": [self.error_messages[key_error]]}, code=key_error
            )

        is_token_valid = self.context["view"].token_generator.check_token(
            self.user, self.initial_data.get("token", "")
        )
        if is_token_valid:
            return validated_data
        else:
            key_error = "invalid_token"
            raise ValidationError(
                {"token": [self.error_messages[key_error]]}, code=key_error
            )


class ActivationSerializer(UidAndTokenSerializer):
    default_error_messages = {
        "stale_token": 'Activation token has expired.',
    }

    def validate(self, attrs):
        attrs = super().validate(attrs)
        if not self.user.is_active:
            user_profile = UserProfile.objects.create(
                auth_user=self.user, language=attrs['language'], accept_offers_and_newsletters=True)
            return attrs
        raise exceptions.PermissionDenied(self.error_messages["stale_token"])


# signup serializer
class SignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        required=True, min_length=3, max_length=80)
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(required=True, validators=[
                                     UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(required=True, min_length=8)
    re_password = serializers.CharField(required=True, min_length=8)
    language = serializers.CharField(required=False, default="es-ES")

    class Meta:
        model = User
        fields = ('id', 'first_name', 'username', "language"
                  'email', 'password', 're_password')

    def validate_confirm_password(self, value):
        if value != self.initial_data['password']:
            raise serializers.ValidationError(
                "Incorrect password", code='invalid')
        return value

    def clean(self):
        errors = {}
        self.raise_validation_error(errors)

    # raise validation error
    def raise_validation_error(self, errors={}):
        error_filter = {k: v for k, v in errors.items() if v is not None}
        errors.clear()
        errors.update(error_filter)
        if errors:
            raise ValidationError(errors, code='invalid')

    def save(self, validated_data):
        self.clean()
        user = User.objects.create_user(**validated_data)
        user_profile = UserProfile.objects.create(
            auth_user=user, **validated_data, accept_offers_and_newsletters=True)
        return True


# login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True, required=True)
    password = serializers.CharField(
        min_length=6, max_length=64, write_only=True, required=True)

    def login(self, **kwargs):
        username = self.validated_data['username']
        password = self.validated_data['password']

        # Accept both username and email
        user = User.objects.filter(
            Q(username=username) | Q(email=username)).first()
        if not user:
            raise serializers.ValidationError(
                {"detail": "No active account found with the given credentials."})

        if not user.is_staff or not user.is_superuser:
            raise serializers.ValidationError(
                {"detail": "Aquí no puedes entrar"})

        user = auth.authenticate(username=user.username, password=password)
        if not user:
            raise serializers.ValidationError(
                {"detail": "No active account found with the given credentials."})

        return user
