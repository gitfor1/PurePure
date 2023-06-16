from django.conf import settings
from product.models import InventoryItem


class Cart(object):
    def __init__(self, request):
        cart = self.session.get(settings.CART_SESSION_ID)

        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}

        self.cart = cart


    def __iter__(self):
        for p in self.cart.keys():
            self.cart[int(p)]['product'] = InventoryItem.object.get(pk=p)

    def __len__(self):
        return sum(item['quantity'] for item in self.cart.values())

    def save(self):
        self.session[settings.CART_SESSION_ID] = self.cart 
        self.session.modified = True

    def add(self, product_id, price, quantity, title, image,  color, apply_discount, update_quantity):
        product_id = int(product_id)
        product_quantity = int(quantity)

        if product_id not in self.cart:
            self.cart[product_id] = {
                'userid': self.request.user.id,
                'id': product_id,
                'price': price,
                'quantity': product_quantity,
                'title': title,
                'image':image,
                'color': color,
            }

        if apply_discount:
            self.cart[product_id]['price'] = price

        if update_quantity:
            self.cart[product_id]['quantity'] += product_quantity

            if self.cart[product_id]['quantity'] == 0:
                self.remove(product_id)

        self.save()

    def cart_total_price(self):
        total_price = 0.0
        for key,value in self.request.session['cart'].items():
            total_price = total_price + (float(value['price']) * value['quantity'])
        return total_price

    def cart_subtotal(product):
        for key,value in self.request.session['cart'].items():
            subTotal = (float(value['price']) * value['quantity'])
        return subTotal

    def remove(self, product_id):
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    def clear(self):
        self.session[settings.CART_SESSION_ID] = {}
        self.session.modified = True