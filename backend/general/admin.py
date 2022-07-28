from django.contrib import admin

# Register your models here.
from .models import *


class MediaGalleryAdmin(admin.ModelAdmin):
    list_display = ("id", "product", "file")
    search_fields = ("product__product_name", )
    readonly_fields = ("resized",)


admin.site.register(MediaGallery, MediaGalleryAdmin)
