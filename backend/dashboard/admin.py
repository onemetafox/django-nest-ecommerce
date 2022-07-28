from csv import list_dialects
from django.contrib import admin

# Register your models here.
from .models import *
admin.site.register(Company)
admin.site.register(DataProtection)
admin.site.register(Shipping)
admin.site.register(ShippingMethod)
admin.site.register(HomeSlider)
admin.site.register(HomeBanner)
admin.site.register(Provider)
admin.site.register(PromoWeb)
admin.site.register(ActivePromo)
admin.site.register(WebCommon)
