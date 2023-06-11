from .models import InventoryItem, CartItem, Discount
from index.extensions.group_list_convertor import group_list
from django.contrib.auth.decorators import login_required
from index.extensions.http_service import get_client_ip
from django.views.generic import ListView, DetailView
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render, redirect
from django.views.generic.base import View
from django.contrib import messages
from django.db.models import Count
from .forms import DiscountForm
from carton.cart import Cart


@login_required
def cart_view(request):
    cart = Cart(request.session)
    discount = DiscountForm()
    return render(request, 'products/cart/cart.html', {'cart': cart, 'discount': discount})


@login_required
@csrf_exempt
def add_to_cart(request):
    cart = Cart(request.session)
    product_id = int(request.POST.get('product_id'))
    try:
        product = InventoryItem.objects.get(pk=product_id)
        if product.is_available:
            quantity_requested = int(request.POST.get('quantity', 1))
            if quantity_requested <= product.quantity:
                cart.add(product, price=product.price)
                message = f"محصول {product.product_title}با موفقیت به سبد خرید اضافه شد."
                messages.success(request, message)
                response_data = {'success': True}
            else:
                message = "تعداد سفارش درخواستی بیشتر از موجودی محصول است."
                messages.error(request, message)
                response_data = {'success': False}
        else:
            message = "موجودی محصول به پایان رسیده است."
            messages.error(request, message)
            response_data = {'success': False}
    except InventoryItem.DoesNotExist:
        message = "محصول مورد نظر پیدا نشد."
        messages.error(request, message)
        response_data = {'success': False}

    return redirect(request.META.get('HTTP_REFERER'))


@login_required
@csrf_exempt
def remove_from_cart(request):
    cart = Cart(request.session)
    product_id = int(request.POST.get('product_id'))
    try:
        product = InventoryItem.objects.get(pk=product_id)
        cart.remove_single(product)
        message = f"محصول {product.product_title} با موفقیت از سبد خرید حذف شد."
        response_data = {'success': True, 'message': message}
    except InventoryItem.DoesNotExist:
        message = "محصول مورد نظر پیدا نشد."
        response_data = {'success': False, 'message': message}
    
    return redirect(request.META.get('HTTP_REFERER'))


@login_required
@csrf_exempt
def apply_discount(request):
    if request.method == 'POST':
        form = DiscountForm(request.POST)
        if form.is_valid():
            code = form.cleaned_data['code']
            cart = request.session.get('cart', {})
            # Update cart prices with discounts
            for item_id, quantity in cart.items():
                try:
                    item = InventoryItem.objects.get(pk=item_id)
                    discounted_price = item.apply_discount(discount_code=code)
                    cart[item_id]['price'] = discounted_price
                except InventoryItem.DoesNotExist:
                    pass

            # Save updated cart in session
            request.session['cart'] = cart

            # Prepare cart data as JSON response
            cart_data = {
                'success': True,
                'message': 'کد تخفیف با موفقیت اعمال شد.',
                'cart': cart,
            }

            return redirect(request.META.get('HTTP_REFERER'))
        else:
            # Prepare error response
            error_data = {
                'success': False,
                'message': 'کد تخفیف نامعتبر است.',
            }

            return redirect(request.META.get('HTTP_REFERER'))


@login_required
def CheckoutView(request):
    pass
    

@login_required
@csrf_exempt
def update_cart(request):
    if request.method == 'POST':
        product_id = int(request.POST.get('product_id'))
        quantity = int(request.POST.get('quantity'))

        try:
            product = InventoryItem.objects.get(pk=product_id)
            if quantity > 0:
                cart = Cart(request.session)
                cart.update_quantity(product, quantity)
                message = f"تعداد محصول {product.product_title} با موفقیت به‌روزرسانی شد."
                response_data = {'success': True, 'message': message}
            else:
                message = "تعداد محصول باید بیشتر از صفر باشد."
                response_data = {'success': False, 'message': message}
        except InventoryItem.DoesNotExist:
            message = "محصول مورد نظر پیدا نشد."
            response_data = {'success': False, 'message': message}
        
        return redirect(request.META.get('HTTP_REFERER'))