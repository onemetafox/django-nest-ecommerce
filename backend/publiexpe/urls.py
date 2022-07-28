"""publiexpe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('back-dev/', admin.site.urls),

    # Auth
    path('api/v1/auth/', include('auth.urls')),

    # Web Accounts
    path('api/v1/accounts/', include('djoser.urls')),
    path('api/v1/accounts/', include('djoser.urls.jwt')),

    # User
    path('api/v1/user/', include('user.urls')),

    # Web
    path('api/v1/web/', include('web.urls')),

    # Ecommerce
    path('api/v1/ecommerce/', include('ecommerce.urls')),

    # Ecommerce cart
    path('api/v1/order/', include('cart.urls')),

    # Admin Panel
    path('api/v1/admin/', include('dashboard.urls')),

    # Media Gallery
    path('api/v1/gallery/', include('general.urls'))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
