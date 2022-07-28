from rest_framework import serializers

from .models import Company, HomeBanner, HomeSlider, Provider, Shipping, ShippingMethod, DataProtection


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


class DataProtectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataProtection
        fields = ["id", "display_text", "legal_advice", "privacy_policy",
                  "cookies_web", "terms_and_conditions", "version", "updated_at"]


class ShippingMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingMethod
        fields = ["id", "slug", "name",
                  "is_active", "description", "price", "type", "requirement"]
        many = True


class ShippingSerializer(serializers.ModelSerializer):
    shippings_methods = ShippingMethodSerializer(many=True, read_only=True)

    class Meta:
        model = Shipping
        fields = ["id", "slug", "zone_name", "regions", "shippings_methods"]


class HomeSliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeSlider
        fields = ["id", "slug", "title", "slider_image", "image_url",
                  "link_to", "updated_at", "is_active", ]

    def get_product_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.slider_image.url)


class HomeBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBanner
        fields = "__all__"

    def get_product_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.banner_image.url)


class ProviderSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(required=True)

    class Meta:
        model = Provider
        fields = "__all__"
