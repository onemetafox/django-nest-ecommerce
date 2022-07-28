from django.utils import timezone
from rest_framework import serializers

from .models import ActivePromo, Company, HomeBanner, HomeSlider, PromoWeb, Provider, Shipping, ShippingMethod, DataProtection, WebCommon


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
        fields = "__all__"

    def get_product_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


class HomeBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBanner
        fields = "__all__"

    def get_product_image(self, obj):
        return self.context['request'].build_absolute_uri(obj.image.url)


class ProviderSerializer(serializers.ModelSerializer):
    provider_name = serializers.CharField(required=True)

    class Meta:
        model = Provider
        fields = "__all__"


class PromoWebSeralizer(serializers.ModelSerializer):
    class Meta:
        model = PromoWeb
        fields = "__all__"


class PromosWebSerializer(serializers.ModelSerializer):
    promo_web = PromoWebSeralizer(read_only=True)

    class Meta:
        model = PromoWeb
        fields = "__all__"

    def get_active_promo():
        try:
            active_promo = ActivePromo.objects.get(is_active=True)
            promo = active_promo.promo_web
            today = timezone.now()
            if today >= promo.expired_at:
                promo.is_active = False
                promo.save()
                return None
            else:
                return promo
        except ActivePromo.DoesNotExist:
            return None


# Common things related to the company and the website
class WebCommonSerializer(serializers.ModelSerializer):
    web_config = serializers.SerializerMethodField()

    class Meta:
        model = WebCommon
        fields = ("id", "welcome_text", "web_title",
                  "about_us_text", "web_config")

    def get_web_config(self, obj):
        company = Company.objects.first()
        if company:
            serializers = CompanySerializer(company)
            return serializers.data
        else:
            return None
