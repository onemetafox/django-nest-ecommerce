from logging import exception
import os
from dateutil.relativedelta import relativedelta
from datetime import datetime
from django import forms
from django.template.defaultfilters import slugify
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

# import models
from user.models import UserProfile
from .models import Company, DataProtection, HomeBanner, HomeSlider, Provider, Shipping, ShippingMethod
from .serializers import CompanySerializer, HomeBannerSerializer, HomeSliderSerializer, ProviderSerializer, ShippingMethodSerializer, ShippingSerializer, DataProtectionSerializer

# Dashboard View


class DashboardView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request):
        prev_week = datetime.now() - relativedelta(weeks=1)

        # Users count by week
        total_users = UserProfile.objects.count()
        recently_users_registered = UserProfile.objects.filter(
            created_at__gte=prev_week).count()

        # Order count by week
        # total_orders: Orders.object.count()
        # recently_orders_placed: UserProfile.objects.filter(created_at__gte=prev_week)

        output = {
            "users_this_week": recently_users_registered,
            "total_users": total_users,
            # "total_ordes": total_orders,
            # "orders_placed_this_week":recently_orders_placed
        }
        return Response(output, status=status.HTTP_200_OK)


# Company info
class CompanyView(APIView):
    permisson_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = CompanySerializer

    def get(self, request):
        try:
            company = Company.objects.get()
            serializer = self.serializer_class(company)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Company.DoesNotExist:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        company = Company.objects.filter(cif=request.data["cif"]).first()
        if not company is None:
            serializer = self.serializer_class(
                company, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        else:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

# Data Privacy


class DataPrivacyView(APIView):
    serializer_class = DataProtectionSerializer

    def get(self, request):
        try:
            queryset = DataProtection.objects.all()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DataProtection.DoesNotExist:
            return Response({'message': 'Record not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        id = request.data.get("id")
        if id:
            data_protection = DataProtection.objects.filter(
                id=id).first()
            if data_protection is not None:
                serializer = self.serializer_class(
                    data_protection, data=request.data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
        else:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

# Shipping


class ShippingView(APIView):
    permisson_classes = (IsAuthenticated, IsAdminUser)
    serializer_class = ShippingSerializer
    methods_serializer_class = ShippingMethodSerializer

    def get(self, request):
        queryset = Shipping.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        shipping_serializer = self.serializer_class(data=request.data)
        shipping_serializer.is_valid(raise_exception=True)
        shipping = shipping_serializer.save()
        shippings_methods = request.data.pop("shippings_methods")
        sh = self.methods_serializer_class(
            shipping_serializer, data=shippings_methods, many=True)
        sh.is_valid()
        for method in sh.validated_data:
            new_method = self.methods_serializer_class(data=method)
            new_method.is_valid()
            method = new_method.save()
            shipping.shippings_methods.add(method)

        return Response(shipping_serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, slug):
        try:
            data = request.data
            shipping_obj = Shipping.objects.get(slug=data["slug"])
            shipping_serializer = self.serializer_class(
                shipping_obj, data=data, partial=True)
            shipping_serializer.is_valid(raise_exception=True)
            shipping = shipping_serializer.save()
            if data["shippings_methods"]:
                shippings_methods = data["shippings_methods"]
                for method in shippings_methods:
                    if method.get("slug"):
                        shipping_method = ShippingMethod.objects.get(
                            slug=method["slug"])
                        single_method_serializer = self.methods_serializer_class(
                            shipping_method, data=method, partial=True)
                        single_method_serializer.is_valid(raise_exception=True)
                        single_method_serializer.save()
                    else:
                        new_method = self.methods_serializer_class(data=method)
                        new_method.is_valid()
                        method = new_method.save()
                        shipping.shippings_methods.add(method)

            return Response(shipping_serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response({"meesage": "Shipping could not be updated."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, slug):
        try:
            shipping = Shipping.objects.get(slug=slug)
            shipping.delete()
            return Response({'message': 'Record deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
        except Shipping.DoesNotExist:
            return Response({'message': 'Shipping zone does not exist'}, status=status.HTTP_404_NOT_FOUND)

# Landing settings


class LandingView(APIView):
    permission_clasess = (AllowAny)
    banner_serializer_class = HomeBannerSerializer
    slider_serializer_class = HomeSliderSerializer

    def get(self, request):
        banners = HomeBanner.objects.all()
        sliders = HomeSlider.objects.all()
        return Response({'banners': banners.values(), "sliders": sliders.values()}, status=status.HTTP_200_OK)


class BannerView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    banner_serializer_class = HomeBannerSerializer
    slider_serializer_class = HomeSliderSerializer
    parser_classes = [MultiPartParser, FormParser]

    def delete(self, request, slug):
        # Check wheter is a banner or a slider
        object = HomeSlider.objects.filter(slug=slug).first()
        if object is not None:
            object.delete()
        else:
            object = HomeBanner.objects.filter(slug=slug)
            if object is not None:
                object.delete()

        return Response({"message": "Record deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)


class SliderUpload(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    parser_classes = [MultiPartParser, FormParser]
    serializer = HomeSliderSerializer

    def post(self, request, format=None):
        serializer = self.serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, slug):
        slider = HomeSlider.objects.get(slug=slug)
        serializer = self.serializer(slider, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class BannerUpload(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    parser_classes = [MultiPartParser, FormParser]
    serializer = HomeBannerSerializer

    def post(self, request, format=None):
        slug = request.data.get("slug")
        if slug:
            slider = HomeBanner.objects.filter(slug=slug).first()
            serializer = self.serializer(
                slider, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = self.serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, slug):
        slider = HomeBanner.objects.get(slug=slug)
        serializer = self.serializer(slider, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProviderView(APIView):
    serializer_class = ProviderSerializer
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request):
        providers = Provider.objects.all()
        return Response({'providers': providers.values()}, status=status.HTTP_200_OK)

    def post(self, request):
        slug = request.data.get("slug", None)
        if slug is not None:
            provider = Provider.objects.get(slug=slug)
            serializer = self.serializer_class(
                provider, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save(provider_name=request.data.get(
                "provider_name").upper())
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            slug = slugify(request.data.get("provider_name"))
            obj = Provider.objects.filter(slug=slug).first()
            if obj is None:
                serializer.save(provider_name=slug.upper())
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Provider already exists'}, status=status.HTTP_200_OK)


class ImportView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)

    def post(self, request, provider):
        params = request.get("params", None)
        print(params)
        #os.system("python .\manage.py import_"+provider+" " + params or "")
        return Response({"message": "Importando " + provider}, status=status.HTTP_200_OK)
