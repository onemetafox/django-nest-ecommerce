from django.urls import path

from . import views

urlpatterns = [
    path('', views.MediaGalleryView.as_view(),
         name='gallery'),    # [GET] gallery list
    path('single/<int:pk>/', views.SingleMediaView.as_view(),
         name='gallery'),    # [GET] media single
    path('upload/', views.MediaGalleryView.as_view(),
         name="upload-media-gallery"),  # [POST] upload media view
    path('update/<int:pk>/', views.SingleMediaView.as_view(),
         name="upload-media-gallery"),  # [PATCH] upload media view
    path('delete/<int:pk>/', views.MediaGalleryView.as_view(),
         name="delete-media-gallery"),  # [DELETE] delete media vieW
]
