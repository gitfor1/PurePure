from .models import Cart 

def cart_items(request):
    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user.phoneNumber)
    else:
        cart = 0
    return {'cart_items': cart}

def cart_total(request):
    if request.user.is_authenticated:
        total_price = Cart.calculate_total_price(request.user.phoneNumber)
    else:
        total_price = 0
    return {'cart_total': total_price}
