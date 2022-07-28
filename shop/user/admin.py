from django.contrib import admin

# Register your models here.
from .models import  UserProfile, BillingAddress, ShippingAddress

class ProfileAdmin(admin.ModelAdmin):

    list_display = ("id", "slug", "get_auth_user_email", "get_auth_user_first_name", "get_auth_user_last_name", "is_email_verified", "accept_offers_and_newsletters", "created_at" )
    search_fields = ("id", "slug", )
    readonly_fields = ("id", "slug",)
    list_display_links = ("id", "slug")

    @admin.display(description='First Name', ordering='auth_user__first_name')
    def get_auth_user_first_name(self, obj):
        return obj.auth_user.first_name

    @admin.display(description='Last Name', ordering='auth_user__last_name')
    def get_auth_user_last_name(self, obj):
        return obj.auth_user.last_name

    @admin.display(description='Email', ordering='auth_user__email')
    def get_auth_user_email(self, obj):
        return obj.auth_user.email

class BillingAddressAdmin(admin.ModelAdmin):
    
    list_display = ("id", "slug", "get_auth_user_email", "phone_number", "company_name", "address", "city", "province", "postal_code", "created_at", "country", "cif" )
    search_fields = ("id", "slug", "cif" )
    readonly_fields = ("id", "slug",)
    list_display_links = ("id", "slug")

    @admin.display(description='Email', ordering='auth_user__email')
    def get_auth_user_email(self, obj):
        return obj.auth_user.email

class ShippingAddressAdmin(admin.ModelAdmin):
    
    list_display = ("id", "slug", "get_auth_user_email", "phone_number", "name", "address", "city", "province", "postal_code", "created_at", "country"  )
    search_fields = ("id", "slug", )
    readonly_fields = ("id", "slug",)
    list_display_links = ("id", "slug")

    @admin.display(description='Email', ordering='auth_user__email')
    def get_auth_user_email(self, obj):
        return obj.auth_user.email

admin.site.register(UserProfile, ProfileAdmin)
admin.site.register(BillingAddress, BillingAddressAdmin)
admin.site.register(ShippingAddress, ShippingAddressAdmin)