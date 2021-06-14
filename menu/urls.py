from django.urls import path

from .views import MenuItemListAPIView

urlpatterns = [
    path('', MenuItemListAPIView.as_view(), name="menuitem_list")
]
