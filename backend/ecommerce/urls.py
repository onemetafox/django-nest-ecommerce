from django.urls import path
from . import views

urlpatterns = [
    # Color
    path('color/', views.ColorView.as_view(),
         name='color-list'),    # [GET] color list
    path('color/create/', views.ColorView.as_view(),
         name='color-create'),    # [POST] color create
    path('color/<str:slug>/update/', views.ColorView.as_view(),
         name='color-update'),    # [PUT] color update
    path('color/<str:slug>/delete/', views.ColorView.as_view(),
         name='color-delete'),    # [DELETE] color delete
    path('color/<str:slug>/view/', views.ColorRecordView.as_view(),
         name='color-view'),    # [GET] color view
    # Size
    path('size/', views.SizeView.as_view(),
         name='size-list'),    # [GET] size list
    path('size/create/', views.SizeView.as_view(),
         name='size-create'),    # [POST] size create
    path('size/<str:slug>/update/', views.SizeView.as_view(),
         name='size-update'),    # [PUT] size update
    path('size/<str:slug>/delete/', views.SizeView.as_view(),
         name='size-delete'),    # [DELETE] size delete
    path('size/<str:slug>/view/', views.SizeRecordView.as_view(),
         name='size-view'),    # [GET] size view
    # Category
    path('category/', views.CategoryView.as_view(),
         name='category-list'),    # [GET] category list
    path('category/list/', views.CategoryMinimalView.as_view(),
         name='category-minimakl-list'),    # [GET] category minimal list
    path('category/create/', views.CategoryView.as_view(),
         name='category-create'),    # [POST] category create
    path('category/<str:slug>/update/', views.CategoryView.as_view(),
         name='category-update'),    # [PUT] category update
    path('category/<str:slug>/delete/', views.CategoryView.as_view(),
         name='category-delete'),    # [DELETE] category delete
    path('category/<str:slug>/view/', views.CategoryWithSubCategoryView.as_view(),
         name='category-view'),    # [GET] category with subcategory view

    # Product
    path('product/', views.ProductView.as_view(),
         name='product-list'),    # [GET] product list
    path('product/create/', views.ProductView.as_view(),
         name='product-create'),    # [POST] product create
    path('product/<str:slug>/update/', views.ProductView.as_view(),
         name='product-update'),    # [PUT] product update
    path('product/<str:slug>/delete/', views.ProductView.as_view(),
         name='product-delete'),    # [DELETE] product delete
    path('product/<str:slug>/view/', views.ProductDetailedView.as_view(),
         name='product-view'),    # [GET] product view
    path('product/topsellers/', views.ProductTopSellerView.as_view(),
         name='product-topsellers-view'),    # [GET] product top sellers view
    path('product/<str:slug>/record-sale/', views.ProductTopSellerView.as_view(),
         name='product-topsellers-record-sale-view'),    # [POST] product top sellers view
    path('product/<str:q>/', views.ProductSearchView.as_view(),
         name="product-search"),  # [GET] product search containing q
    path('product/<str:slug>/media/', views.ProductMediaView.as_view(),
         name='product-media'),    # [GET] get product media # [PATCH] set image as main
    path('product/<str:slug>/media/<int:pk>/', views.ProductMediaView.as_view(),
         name='product-media-delete'),    # [DELETE] Delete product image media
    path('product/<str:slug>/thumb/', views.ProductThumbnailView.as_view(),
         name="product-thumb-update"),  # [PATCH] Update product thumbnail
    path('product/<str:slug>/seo/', views.ProductSeoView.as_view(),
         name="product-seo"),  # [POST] Add or Update product SEO
    path('product/tags/list/', views.TagsView.as_view(),
         name="product-tags"),  # [GET] 10 most used tags

    # Variants
    path('product/<str:slug>/variant/create/',
         views.VariantView.as_view(), name="variant-create"),
    path('product/variant/<str:slug>/edit/', views.VariantView.as_view(),
         name="variant-view"),  # [POST] Create and update ProductVariant
    path('product/variant/<str:slug>/delete/', views.VariantView.as_view(),
         name="variant-delete"),  # [DELETE] Delete ProductVariant
    path('product/variant/<str:slug>/media/', views.VariantImageView.as_view(),
         name="variant-media"),  # [PATCH] Update ProductVariant Media
    path('product/<str:slug>/variant/update-price/', views.VariantPriceView.as_view(),
         name="variant-update-price"),  # [PATCH] Update ProductVariant Media

    # Engraved
    path('engraved/area/', views.EngravedAreaView.as_view(),
         name="engraved-area-list"),  # [GET] Engraved Area list
    path('engraved/area/create/', views.EngravedAreaView.as_view(),
         name="engraved-area-create"),  # [POST] Engraved Area create
    path('engraved/area/<str:slug>/update/', views.EngravedAreaView.as_view(),
         name="engraved-area-update"),  # [PATCH] Engraved Area update
    path('engraved/area/<str:slug>/delete/', views.EngravedAreaView.as_view(),
         name="engraved-area-delete"),  # [DELETE] Engraved Area delete

    path('engraved/technique/', views.EngravingTechniqueView.as_view(),
         name="engraved-technique-list"),  # [GET] Engraved technique list
    path('engraved/technique/<str:q>/', views.EngravingTechniqueSearchView.as_view(),
         name="engraved-search"),  # [GET] Engraving Technique search containing q
]
