from django.contrib.auth.models import User
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django.utils.translation import gettext as _
from django.contrib.sites.shortcuts import get_current_site

# import models
from .models import BillingAddress, ShippingAddress, UserProfile

# import serializers
from .serializers import UserProfileSerializer, UserSerializer,  BillingAddressSerializer, ShippingAddressSerializer

# my-profile view


class MyProfileView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        try:
            # user profile
            logged_in_user = User.objects.get(id=request.user.id)
            user_profile = self.serializer_class(logged_in_user)
            return Response({'user_profile': user_profile.data}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile record not found'}, status=status.HTTP_404_NOT_FOUND)


# User view
class UserView(APIView):
    user_serializer_class = UserSerializer
    user_profile_class = UserProfileSerializer
    billing_address_serializer_class = BillingAddressSerializer
    shipping_address_serializer_class = ShippingAddressSerializer

    def get(self, request):
        paginator = PageNumberPagination()
        queryset = User.objects.all()
        context = paginator.paginate_queryset(queryset, request)
        serializer = self.user_serializer_class(context, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        user_serializer = self.user_serializer_class(data=request.data)
        user_serializer.is_valid(raise_exception=True)

        user_billing_address = request.data.pop('user_billing_address')
        billing_address_serializer = self.billing_address_serializer_class(
            data=user_billing_address)
        billing_address_serializer.is_valid(raise_exception=True)

        user_profile = request.data.pop('user_profile')
        user_profile_serializer = self.user_profile_class(data=user_profile)
        user_profile_serializer.is_valid(raise_exception=True)

        user = user_serializer.save()
        user_profile_serializer.save(auth_user_id=user.id)

        billing_address = billing_address_serializer.save(auth_user=user)

        user_shipping_address = request.data.pop('user_shipping_address')
        for shipping in user_shipping_address:
            shipping_address_serializer = self.shipping_address_serializer_class(
                data=shipping)
            shipping_address_serializer.is_valid(raise_exception=True)
            shipping_address = shipping_address_serializer.save(
                auth_user=user, **shipping)

        user_serializer = self.user_serializer_class(
            User.objects.get(id=user.id))

        return Response(user_serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, slug):
        try:
            user_profile = UserProfile.objects.get(slug=slug)
            user = User.objects.get(id=user_profile.auth_user_id)
            user_serializer = self.user_serializer_class(
                user, data=request.data, partial=True)
            user_serializer.is_valid(raise_exception=True)

            user_profile_request = request.data.get('user_profile')
            if user_profile_request:
                user_profile_serializer = self.user_profile_class(
                    data=user_profile_request, partial=True)
                user_profile_serializer.is_valid(raise_exception=True)
                UserProfile.objects.update(
                    auth_user=user, **user_profile_request)

            user_billing_address = request.data.get('user_billing_address')
            if user_billing_address:
                billing_address_serializer = self.billing_address_serializer_class(
                    data=user_billing_address, partial=True)
                billing_address_serializer.is_valid(raise_exception=True)
                BillingAddress.objects.update(
                    auth_user_id=user.id, **user_billing_address)

            user_shipping_address = request.data.get('user_shipping_address')
            if user_shipping_address:
                for shipping in user_shipping_address:
                    shipping_slug = shipping.get("slug")
                    if shipping_slug:
                        user_shippings = ShippingAddress.objects.get(
                            auth_user=user, slug=shipping_slug)
                        single_shipping_serializer = self.shipping_address_serializer_class(
                            user_shippings, data=shipping, partial=True)
                        single_shipping_serializer.is_valid(
                            raise_exception=True)
                        shipping_address = single_shipping_serializer.save()

            user = user_serializer.save()

            user_serializer = self.user_serializer_class(
                User.objects.get(id=user.id))
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile  does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        try:
            user_profile = UserProfile.objects.get(slug=slug)
            user = User.objects.get(id=user_profile.auth_user_id)
            user.delete()
            return Response({'message': 'Record deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except User.DoesNotExist:
            return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

# ADMIN
# details user views


class UserDetails(APIView):
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        try:
            logged_in_user = User.objects.get(id=kwargs['id'])
            user_profile = self.serializer_class(logged_in_user)
            return Response({'user_profile': user_profile.data}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'User profile record not found'}, status=status.HTTP_404_NOT_FOUND)
