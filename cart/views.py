from django.contrib.auth.decorators import login_required
from index.extensions.http_service import get_client_ip
from django.views.generic import ListView, DetailView
from django.views.decorators.csrf import csrf_exempt
from product.models import InventoryItem, Discount
from django.http import HttpRequest, JsonResponse
from django.shortcuts import render, redirect
from product.forms import DiscountForm
from django.contrib import messages
from .models import Cart 


@login_required
def cart_view(request):
    list_cart = Cart.objects.filter(user=request.user.phoneNumber)
    cart_count = list_cart.count()
    discount = DiscountForm()
    context = {
        'discount': discount,
        'cart_list': cart_count,
    }
    return render(request, 'products/cart/cart.html',context)

@login_required
def add_to_cart(request):
    if request.method == 'POST':
        if request.user.is_authenticated :
            product_id = int(request.POST.get('product_id'))
            product_title = request.POST.get('product_title')
            product_collection = int(request.POST.get('product_collection'))
            product_quantity = int(request.POST.get('quantity'))
            product_color_text = request.POST.get('selected_color_text')
            product_color_quantity = int(request.POST.get('product_color_quantity'))
            product_image = request.POST.get('product_image_url')
            add_cart_date = int(request.POST.get('add_cart_date'))
            try:
                product = InventoryItem.objects.get(pk=product_id)
                if product.is_available and product.is_active:
                    if(Cart.objects.filter(user=request.user.phoneNumber, product_title=product_title, color=product_color_text)):
                        return JsonResponse({'status':"کالا با رنگ بندی انتحاب شده هم اکنون در سبد خرید شما موجود است", 'success': False})
                    else:
                        quantity_requested = product_quantity
                        if quantity_requested <= product.quantity and quantity_requested <= product_color_quantity :
                            if add_cart_date > 0:
                                Cart.objects.create(
                                    user = request.user.phoneNumber,
                                    product_id = product_id,
                                    product_title = product_title,
                                    product_collection = product_collection,
                                    quantity = product_quantity,
                                    price = add_cart_date,
                                    image = product_image,
                                    color = product_color_text,
                                    color_quantity = product_color_quantity,
                                )
                                return JsonResponse({'status':f"محصول {product.product_title} با موفقیت به سبد خرید اضافه شد.", 'success': True})
                            else:
                                Cart.objects.create(
                                    user = request.user.phoneNumber,
                                    product_id = product_id,
                                    product_title = product_title,
                                    product_collection = product_collection,
                                    quantity = product_quantity,
                                    price = product.price,
                                    image = product_image,
                                    color = product_color_text,
                                    color_quantity = product_color_quantity,
                                )
                                return JsonResponse({'status':f"محصول {product.product_title} با موفقیت به سبد خرید اضافه شد.", 'success': True})
                        else:
                            return JsonResponse({'status':"تعداد سفارش درخواستی بیشتر از موجودی محصول است.", 'success': False})
                else:
                    return JsonResponse({'status':"موجودی محصول به پایان رسیده است", 'success': False})

            except InventoryItem.DoesNotExist:
                return JsonResponse({'status':"محصول مورد نظر پیدا نشد.", 'success': False})
        else:
            return JsonResponse({'status':"برای افزودن کالا به سبد خرید ابتدا باید ثبت نام کنید یا وارد حساب خود شوید", 'success': False})

    return render(request, 'products/cart/cart.html',{'discount': discount})

@login_required
def update_cart(request):
    if request.method == 'POST':
        product_title = request.POST.get('product_title')
        quantity = int(request.POST.get('quantity'))
        color_quantity = product_color_quantity = int(request.POST.get('product_color_quantity'))
        if quantity > 0:
            product = InventoryItem.objects.get(product_title=product_title)
            if quantity <= product.quantity and quantity <= color_quantity:
                try:
                    user_cart = Cart.objects.get(user=request.user.phoneNumber, product_title=product_title)
                    user_cart.quantity = quantity
                    user_cart.save()
                    return JsonResponse({'status': "تعداد درخواستی با موفقیت به روز شد", 'success': True})
                except Cart.DoesNotExist:
                    return JsonResponse({'status': "محصول مورد پیدا نشد.", 'success': False})
            else:
                return JsonResponse({'status': "تعداد درخواستی بالاتر از موجودی محصول است.", 'success': False})
        else:
            try:
                Cart.objects.filter(user=request.user.phoneNumber, product_title=product_title).delete()
                return JsonResponse({'status':"محصول از سبد خرید حذف شد.", 'success': True})
            except Cart.DoesNotExist:
                return JsonResponse({'status': "محصول مورد پیدا نشد.", 'success': False})
    else:
        return render(request, 'products/cart/cart.html',{'discount': discount})

@login_required
@csrf_exempt
def remove_from_cart(request):
    if request.method == 'POST':
        product_title = request.POST.get('product_title')
        if product_title:
            try:
                Cart.objects.filter(user=request.user.phoneNumber, product_title=product_title).delete()
                return JsonResponse({'status':"محصول از سبد خرید حذف شد.", 'success': True})
            except:
                return JsonResponse({'status':"محصول مورد پیدا نشد.", 'success': False})
        else:
            return JsonResponse({'status':"محصول مورد پیدا نشد.", 'success': False})
    return render(request, 'products/cart/cart.html',{'discount': discount})

@login_required
@csrf_exempt
def apply_discount(request):
    if request.method == 'POST':
        product_title = request.POST.get('product_title')
        if product_title:
            price = int(request.POST.get('product_price'))
            category_id = int(request.POST.get('product_collection'))
            form = DiscountForm(request.POST)
            if form.is_valid():
                discount = Discount.objects.get(code=form.cleaned_data['code'])
                try:
                    if discount.product == product_id or discount.collection == category_id:
                        code = form.cleaned_data['code']
                        discounted_price = InventoryItem.apply_discount(discount_code=code, price=price)
                        Cart.objects.filter(user=request.user.phoneNumber, product_title=product_title).update(price=int(discounted_price))
                        return JsonResponse({'status':"کد تخفیف با موفقیت اعمال شد.", 'success': True})
                    else:
                        return JsonResponse({'status':"کد تخفیف معتبر نیست", 'success': False})
                except:
                    return JsonResponse({'status':"محصول مورد پیدا نشد.", 'success': False})
        else:
            return JsonResponse({'status':"محصول مورد پیدا نشد.", 'success': False})

    else:
        return render(request, 'products/cart/cart.html',{'discount': discount})

@login_required
def clear_cart(request):
    if request.method == 'POST':
        product_id = request.POST.get('product_id')
        if product_id:
            Cart.objects.filter(user=request.user.phoneNumber).delete()
            return JsonResponse({'status':"سبد خرید خالی شد.", 'success': True})
        else:
            return JsonResponse({'status':"سبد خرید هم اکنون خالی است.", 'success': False})
    else:
        return render(request, 'products/cart/cart.html',{'discount': discount})
