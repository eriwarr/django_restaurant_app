from django.urls import path

from .views import OrderListAPIView

app_name = 'orders'

urlpatterns = [
path('', OrderListAPIView.as_view(), name='order_list')
]
