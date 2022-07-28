from django.conf import settings
from django.urls import path
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.DashboardView.as_view(),
         name='dashboard'),    # [GET] Dashboard
    path('company/', views.CompanyView.as_view(),
         name='dashboard'),    # [GET] Company info
    path('company/create/', views.CompanyView.as_view(),
         name='dashboard-create'),    # [POST]  Company info
    #     Shippings
    path('shippings/', views.ShippingView.as_view(),
         name='shippings'),    # [GET] Shippings list
    path('shippings/create/', views.ShippingView.as_view(),
         name='shippings-create'),    # [POST] Shipping
    path('shippings/<str:slug>/update/', views.ShippingView.as_view(),
         name='shippings-create'),    # [PUT] Shipping
    path('shippings/<str:slug>/delete/', views.ShippingView.as_view(),
         name='shippings-create'),    # [DELETE] Shipping
    # Data Protection
    path('gdrp/', views.DataPrivacyView.as_view(),
         name='data-protection'),    # [GET] Company info
    path('gdrp/update/', views.DataPrivacyView.as_view(),
         name='data-protection-update'),    # [POST] Company info
    # Langing
    path('landing/', views.LandingView.as_view(),
         name='landing-settings'),    # [GET] Landing settings
     path('landing/update/', views.LandingView.as_view(),name='landing-settings-update'),    # [POST] Landing settings

    # Slider
    path('landing/sliders/', views.SliderUpload.as_view(),
         name='landing-slider-add'),    # [POST] Upload sliders
    path('landing/sliders/<str:slug>/active/', views.SliderUpload.as_view(),
         name='landing-slider-active'),    # [PATCH] Upload sliders

    # Banner
    path('landing/banners/', views.BannerUpload.as_view(),
         name='landing-banner-slider-add'),    # [POST] Upload sliders
    path('landing/banners/<str:slug>/active/', views.BannerUpload.as_view(),
         name='landing-slider-active'),    # [PATCH] Upload sliders

    # Slider Banner Delete
    path('landing/<str:slug>/delete/', views.BannerView.as_view(),
         name='landing-banner-slider-delete'),    # [DELETE] Landing settings

    # Providers
    path('provider/', views.ProviderView.as_view(),
         name='provider-view'),    # [GET] Provider list
    path('provider/create/', views.ProviderView.as_view(),
         name='provider-create-view'),    # [POST] Provider list
    path('provider/<str:slug>/delete/', views.ProviderView.as_view(),
         name='provider-delete-view'),    # [DELETE] Provider list

    # Promos
    path('promosweb/', views.PromosWeb.as_view(),
         name='promosweb-view'),  # [GET] Promos web list

    # Commands
    path('import/<str:provider>/', views.ImportView.as_view(),
         name='import-provider-data'),    # [POST] Exec command to import

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
