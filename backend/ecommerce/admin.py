from django.contrib import admin

# import models
from .models import Category, Color, ProductSeo, ProductTopSeller, Size, Product, EngravingTechnique, EngravingArea, EngravingTechniqueColor, ProductVariant


# Category
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("category_name", "parent_category", "slug", "is_active",
                    "show_in_menu_list", "is_favorite", "makito_id", "pfconcept_id", "sticker_id", )
    search_fields = ("category_name", "slug", "makito_id",
                     "pfconcept_id", "sticker_id", )
    readonly_fields = ("slug",)


# Color
class ColorAdmin(admin.ModelAdmin):
    list_display = ("color_name", "slug", "is_active", "color_code", )
    search_fields = ("color_name", "slug", "color_code", "makito_color")
    readonly_fields = ("slug",)


# Size
class SizeAdmin(admin.ModelAdmin):
    list_display = ("size_name", "slug", "makito_size",
                    "stricker_size", "order", )
    search_fields = ("size_name", "slug", "makito_size",
                     "stricker_size", "order", )
    readonly_fields = ("slug",)


# Product
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "product_name", "slug", "category",
                    "root_reference", "is_published")
    search_fields = ("product_name", "slug", "category__category_name",
                     "root_reference", "is_published", )
    readonly_fields = ("slug",)


# Product Variation
class ProductVariationAdmin(admin.ModelAdmin):
    product = Product
    list_display = ("id", "reference", "image", "price", "stock", "available_from",
                    "color", "size", "get_product_name")
    search_fields = ("product__product_name", "slug",
                     "created_at", "available_from", "product__slug")
    readonly_fields = ("slug", "id")

    @admin.display(description='Product name')
    def get_product_name(self, obj):
        return obj.product.product_name

# Engraving Technique


class EngravingTechniqueAdmin(admin.ModelAdmin):
    list_display = ("name", "slug",
                    "code_makito", "created_at", )
    search_fields = ("name", "slug",
                     "code_makito", "created_at", )
    readonly_fields = ("slug",)

# Engraving Technique Color


class EngravingTechniqueColorAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "n_colors", "created_at", )
    search_fields = ("name", "slug", "n_colors", "created_at", )
    readonly_fields = ("slug",)


# Engraved Area
class EngravedAreaAdmin(admin.ModelAdmin):
    list_display = ("name", "slug",
                    "code_makito", "created_at")
    search_fields = ("name", "slug",
                     "code_makito", "created_at")
    readonly_fields = ("slug",)


# Product Top Sales
class ProdcutTopSellerAdmin(admin.ModelAdmin):
    list_display = ("product", "sales")
    search_fields = ("product", "sales")


# Product SEO
class ProductSeoAdmin(admin.ModelAdmin):
    list_display = ("product", "title")
    search_fields = ("product", "title")


# Register admin models
admin.site.register(Category, CategoryAdmin)
admin.site.register(Color, ColorAdmin)
admin.site.register(Size, SizeAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductVariant, ProductVariationAdmin)
admin.site.register(EngravingTechnique, EngravingTechniqueAdmin)
admin.site.register(EngravingTechniqueColor, EngravingTechniqueColorAdmin)
admin.site.register(EngravingArea, EngravedAreaAdmin)
admin.site.register(ProductTopSeller, ProdcutTopSellerAdmin)
admin.site.register(ProductSeo, ProductSeoAdmin)
