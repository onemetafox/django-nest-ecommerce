from django.conf.urls import include
from django.urls import path
from . import views

urlpatterns = [
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
]
