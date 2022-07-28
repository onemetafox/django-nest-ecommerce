from django.contrib import admin

# import models
from .models import Category, Color, ProductTopSeller, Size, Product, ProductImage, ProductAnnouncement, EngravingTechnique, EngravedArea, EngravingTechniqueColor

# Category


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("category_name", "parent_category", "slug", "is_active",
                    "show_in_menu_list", "is_favorite", "makito_id", "pfconcept_id", "sticker_id", )
    search_fields = ("category_name", "slug", "makito_id",
                     "pfconcept_id", "sticker_id", )
    readonly_fields = ("slug",)

# Color


class ColorAdmin(admin.ModelAdmin):
    list_display = ("color_name", "slug", "is_active", "basic_color",
                    "simple_color", "primary_color", "secondary_color", )
    search_fields = ("color_name", "slug", "basic_color",
                     "simple_color", "primary_color", "secondary_color", )
    readonly_fields = ("slug",)

# Size


class SizeAdmin(admin.ModelAdmin):
    list_display = ("size_name", "slug", "cifra_size", "makito_size",
                    "pfconcept_size", "roly_size", "roly_size_id", "jhk_size", "order", )
    search_fields = ("size_name", "slug", "cifra_size", "makito_size",
                     "pfconcept_size", "roly_size", "roly_size_id", "order", )
    readonly_fields = ("slug",)

# Product


class ProductAdmin(admin.ModelAdmin):
    list_display = ("product_name", "slug", "category", "price",
                    "reference", "stock", "is_published", "available_from")
    search_fields = ("product_name", "slug", "category__category_name", "price",
                     "reference", "stock", "is_published", )
    readonly_fields = ("slug",)

# Product Image


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("product", "slug", "created_at", )
    search_fields = ("product", "slug", "created_at", )
    readonly_fields = ("slug",)

# Product Announcement


class ProductAnnouncementAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "adjective",
                    "title", "sort_order", "is_active", )
    search_fields = ("name", "slug", "adjective",
                     "title", "sort_order", "is_active", )
    readonly_fields = ("slug",)

# Engraving Technique


class EngravingTechniqueAdmin(admin.ModelAdmin):
    list_display = ("engraving_technique_name", "slug",
                    "code_makito", "code_pfconcept", "created_at", )
    search_fields = ("engraving_technique_name", "slug",
                     "code_makito", "code_pfconcept", "created_at", )
    readonly_fields = ("slug",)

# Engraving Technique Color


class EngravingTechniqueColorAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "n_colors", "created_at", )
    search_fields = ("name", "slug", "n_colors", "created_at", )
    readonly_fields = ("slug",)

# Engraved Area


class EngravedAreaAdmin(admin.ModelAdmin):
    list_display = ("name", "display_name", "slug",
                    "code_makito", "code_pfconcept", "created_at", )
    search_fields = ("name", "display_name", "slug",
                     "code_makito", "code_pfconcept", "created_at", )
    readonly_fields = ("slug",)


class ProdcutTopSellerAdmin(admin.ModelAdmin):
    list_display = ("product", "sales")
    search_fields = ("product", "sales")


# Register admin models
admin.site.register(Category, CategoryAdmin)
admin.site.register(Color, ColorAdmin)
admin.site.register(Size, SizeAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(ProductAnnouncement, ProductAnnouncementAdmin)
admin.site.register(EngravingTechnique, EngravingTechniqueAdmin)
admin.site.register(EngravingTechniqueColor, EngravingTechniqueColorAdmin)
admin.site.register(EngravedArea, EngravedAreaAdmin)
admin.site.register(ProductTopSeller, ProdcutTopSellerAdmin)
