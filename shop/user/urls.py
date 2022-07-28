from django.conf.urls import include
from django.urls import path

# import views
from . import views

urlpatterns = [
    # my profile
    path('my-profile', views.MyProfileView().as_view(), name='view-my-profile'),

    # manage user
    path('', views.UserView().as_view(), name='user-list'),
    path('create/', views.UserView().as_view(), name='create-user'),
    path('<str:slug>/update/', views.UserView().as_view(), name='update-user'),
    path('<str:slug>/delete/', views.UserView().as_view(), name='delete-user'),

    ### ADMIN PANEL
    # get user details
    path('details/<int:id>/', views.UserDetails().as_view(), name='user-details'),
]