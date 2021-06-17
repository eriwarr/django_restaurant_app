from rest_framework import generics

# Create your views here.
from .models import Order
from .serializers import OrderSerializer

class OrderListAPIView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
