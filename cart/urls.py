from .views import cart_view, remove_from_cart, update_cart, apply_discount, CheckoutView, add_to_cart
from django.urls import path

urlpatterns = [
    path('apply_discount/', apply_discount, name='apply_discount'),
    path('remove/', remove_from_cart, name='remove_from_cart'),
    path('update/', update_cart, name='update_cart'),
    path('checkout/', CheckoutView, name='checkout'),
    path('add/', add_to_cart, name='add_to_cart'),
    path('', cart_view, name='cart'),
    ]