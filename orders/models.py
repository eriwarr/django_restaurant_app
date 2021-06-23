from django.db import models

# Create your models here.
class Order(models.Model):
    customer = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    email = models.EmailField(max_length=254)
    order = models.JSONField()
    subtotal = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return self.customer
