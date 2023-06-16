from django.conf import settings
from product.models import InventoryItem


class Cart(object):
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)

        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        
        self.cart = cart

    def __iter__(self):
        for p in self.cart.keys():
            product = InventoryItem.objects.get(pk=p)
            if product is not None:
                self.cart[p]['product'] = product
                yield product

    def __len__(self):
        return sum(int(item['quantity']) for item in self.cart.values())

    def save(self):
        self.session[settings.CART_SESSION_ID] = self.cart 
        self.session.modified = True

    def add(self, product_id, price, quantity, title, image,  color, apply_discount, update_quantity):
        product_id = str(product_id)

        if product_id not in self.cart:
            self.cart[product_id] = {
                'id': product_id,
                'price': int(price),
                'quantity': int(quantity),
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

    def get_quantity(self):
        default_quantity = 0
        for value in self.cart.values():
            default_quantity = int(value['quantity'])
        return default_quantity

    def get_image(self):
        image = ''
        for value in self.cart.values():
            image = value['image']
        return image

    def cart_total_price(self):
        total_price = 0
        for value in self.cart.values():
            total_price = total_price + int((value['price'])) * int(value['quantity'])
        return total_price

    def cart_subtotal(self):
        subTotal = 0
        for value in self.cart.values():
            subTotal = int((value['price'])) * int(value['quantity'])
        return subTotal

    def remove(self, product_id):
        del self.cart[product_id]
        self.save()

    def clear(self):
        self.session[settings.CART_SESSION_ID] = {}
        self.session.modified = True