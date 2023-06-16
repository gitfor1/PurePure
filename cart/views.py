from product.models import InventoryItem, CartItem, Discount
from django.contrib.auth.decorators import login_required
from index.extensions.http_service import get_client_ip
from django.views.generic import ListView, DetailView
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpRequest, JsonResponse
from product.forms import DiscountForm
from django.shortcuts import render, redirect
from django.contrib import messages
from .cart import Cart 


@login_required
def cart_view(request):
    discount = DiscountForm()
    return render(request, 'products/cart/cart.html',{'discount': discount})

@login_required
@csrf_exempt
def add_to_cart(request):
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    product_quantity = request.POST.get('quantity')
    product_color_quantity = request.POST.get('product_color_quantity')
    add_cart_date = request.POST.get('add_cart_date')
    product_color_text = request.POST.get('selected_color_text')
    product_image = request.POST.get('product_image_url')
    try:
        product = InventoryItem.objects.get(pk=int(product_id))
        if product.is_available and product.is_active:
            quantity_requested = product_quantity
            if int(quantity_requested) <= product.quantity and int(quantity_requested) <= int(product_color_quantity) :
                if add_cart_date:
                    cart.add(
                        product_id=product_id, 
                        price=add_cart_date, 
                        quantity=quantity_requested, 
                        title=product.product_title, 
                        image=product_image, 
                        color=product_color_text,
                        apply_discount=False, 
                        update_quantity=False,
                    )
                    message = f"محصول {product.product_title} با موفقیت به سبد خرید اضافه شد."
                    messages.success(request, message)
                    response_data = {'success': True}
                else:
                    cart.add(
                        product_id=product_id, 
                        price=product.price, 
                        quantity=quantity_requested, 
                        title=product.product_title, 
                        image=product_image, 
                        color=product_color_text, 
                        apply_discount=False, 
                        update_quantity=False,
                    )
                    message = f"محصول {product.product_title} با موفقیت به سبد خرید اضافه شد."
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
def update_cart(request):
    if request.method == 'POST':
        product_id = int(request.POST.get('product_id'))
        quantity = int(request.POST.get('quantity'))

        try:
            product = InventoryItem.objects.get(pk=product_id)
            if quantity > 0:
                if quantity <= product.quantity and quantity <= product.PRODUCT_COLORS.pquantity :
                    cart = Cart(request)
                    cart.add(
                        product_id=product_id, 
                        quantity=quantity, 
                        update_quantity=True,
                    )
                    message = 'تعداد سفارش با موفقیت اعمال شد'
                    messages.success(request, message)
                    response_data = {'success': True}
                else:
                    message = "سفارش درخواستی بالاتر از موجودی محصول است."
                    response_data = {'success': False, 'message': message}
            else:
                message = "تعداد محصول باید بیشتر از صفر باشد."
                response_data = {'success': False, 'message': message}
        except InventoryItem.DoesNotExist:
            message = "محصول مورد نظر پیدا نشد."
            response_data = {'success': False, 'message': message}
        
        return redirect(request.META.get('HTTP_REFERER'))

@login_required
@csrf_exempt
def remove_from_cart(request):
    cart = Cart(request)
    product_id = request.POST.get('product_id')
    try:
        product = InventoryItem.objects.get(pk=product_id)
        cart.remove(product_id=product_id)
        message = f"محصول {product.product_title} با موفقیت از سبد خرید حذف شد"
        messages.success(request, message)
        response_data = {'success': True}
    except product.DoesNotExist:
        message = "محصول مورد نظر پیدا نشد."
        messages.success(request, message)
        response_data = {'success': False}
    
    return redirect(request.META.get('HTTP_REFERER'))


@login_required
@csrf_exempt
def apply_discount(request):
    if request.method == 'POST':
        product_id = int(request.POST.get('product_id'))
        category_id = int(request.POST.get('category_id'))
        form = DiscountForm(request.POST)
        if form.is_valid():
            discount = Discount.objects.get(code=form.cleaned_data['code'])
            try:
                if discount.product.id == product_id or discount.collection.id == category_id:
                    code = form.cleaned_data['code']
                    cart = Cart(request)
                    product = InventoryItem.objects.get(pk=product_id)
                    discounted_price = product.apply_discount(discount_code=code)
                    cart.add(
                        product_id=product_id, 
                        price=discounted_price, 
                        apply_discount=True
                    )
                    message = 'کد تخفیف با موفقیت اعمال شد'
                    messages.success(request, message)
                    response_data = {'success': True}

                else:
                    message = 'کد تخفیف با نا معتبر است'
                    messages.success(request, message)
                    response_data = {'success': False}

            except product_id.DoesNotExist:
                message = 'محصول یافت نشد'
                messages.success(request, message)
                response_data = {'success': False}

            return redirect(request.META.get('HTTP_REFERER'))

@login_required
def CheckoutView(request):
    pass