from django.contrib import admin
from .models import Cart

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'product_title', 'quantity', 'price', 'image', 'color')
    list_filter = ('user',)
    search_fields = ('user', 'product_title')

admin.site.register(Cart, CartAdmin)
