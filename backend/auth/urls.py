from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView, TokenVerifyView)

from . import views

urlpatterns = [
    # signup (or) registration
    path('signup/', views.SignupView.as_view(), name='signup'),  # POST

    # login & logout
    path('login/', views.LoginView.as_view(), name='login'),  # POST
    path('logout/', views.LogoutView.as_view(), name='logout'),  # POST

    # refresh and verify token
    path('login/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('login/verify/', TokenVerifyView.as_view(), name='token-verify'),

]
