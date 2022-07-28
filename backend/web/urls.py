from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomePageView.as_view(),
         name='home-page'),    # [GET] home page
    path('sliders/', views.HomeCarouselView.as_view(),
         name='home-page-sliders'),    # [GET] Landing page Sliders
    path('banners/', views.HomeBannersView.as_view(),
         name='home-page-banners'),    # [GET] Landing page Banners

    # Products
    path('product/<str:slug>/view/', views.WebProductView.as_view(),
         name='product-single-view'),    # [GET] product record view
    path('product/<str:slug>/record-visit/', views.WebProductRecordView.as_view(),
         name='product-record-visit'),    # [POST] product record view
    path('product/<str:slug>/related/', views.WebRelatedProductView.as_view(),
         name='product-related-view'),    # [GET] product related view

    path('outlet/', views.WebOutletPorductsView.as_view(),
         name='product-outlet-view'),    # [GET] product record view
    path('categories/', views.WebCategoriesView.as_view(),
         name='menu-categories-view'),   # [GET] megamenu categories view
    path('search', views.WebSearchView.as_view(),
         name='search-product-view'),   # [GET] search view
    path("filter", views.WebShopFilterView.as_view(),
         name="shop-filter-view"),  # [GET] filter view
]
