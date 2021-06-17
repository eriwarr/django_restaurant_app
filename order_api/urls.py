from django.urls import path, include

app_name ='api_v2'

urlpatterns = [
    path('orders/', include('orders.urls', namespace='orders')),
]
