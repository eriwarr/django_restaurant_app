from django.db import models

# Create your models here.
class MenuItem(models.Model):
    food = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    image = models.CharField(max_length=255)

    def __str__(self):
        return self.food
