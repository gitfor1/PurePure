from user_accounts.models import user_accounts as User
from product.models import InventoryItem
from django.db import models


class Cart(models.Model):
    user = models.CharField(max_length=100, verbose_name='کاربر', null=True, blank=True)
    product_id = models.CharField(max_length=100, verbose_name='شناسه محصول', null=True, blank=True)
    product_title = models.CharField(max_length=100, verbose_name='نام محصول', null=True, blank=True)
    product_collection = models.CharField(max_length=100, verbose_name='شناسه دسته بندی محصول', null=True, blank=True)
    quantity = models.PositiveIntegerField(verbose_name='تعداد محصول', null=True)
    price = models.PositiveIntegerField(verbose_name='قیمت', blank=False, null=False)
    image = models.CharField(max_length=100, verbose_name='تصویر محصول', null=True, blank=True)
    color = models.CharField(max_length=30, verbose_name='رنگ محصول', null=True, blank=True)
    color_quantity = models.PositiveIntegerField(verbose_name='تعداد رنگ بندی موجود', null=True)
    
    def calculate_item_price(self):
        item_price = 0
        if self.quantity and self.price:
            item_price = self.quantity * self.price
        return item_price

    @classmethod
    def calculate_total_price(cls, user):
        total_price = 0
        cart_items = Cart.objects.filter(user=user)
        for cart_item in cart_items:
            total_price += cart_item.calculate_item_price()
        return total_price

    class Meta:
        verbose_name = 'آیتم سبد خرید'
        verbose_name_plural = 'آیتم‌های سبد خرید'