'''
Accounts views :
'''

#Import all requirements
from django.contrib.auth.decorators import login_required
from allauth.account.views import SignupView, LoginView
from django.shortcuts import render, redirect, reverse
from .forms import LoginForm, CustomUserCreationForm
from django.contrib.auth import login, authenticate
from .models import user_accounts
from django.views import View


@login_required
def dashboardView(request):
    pass

def login_signup(request):
    if request.method == 'POST':

        # give users next urls and save next url to session
        next_url = request.POST.get('next')
        request.session['next_url'] = next_url

        # check the next url
        if not next_url:
            next_url = request.session.get('next_url')

        login_form = LoginForm(request, data=request.POST)
        signup_form = CustomUserCreationForm(request.POST)
        
        if login_form.is_valid():
            user = login_form.get_user()
            login(request, user, backend='user_accounts.backends.CustomBackend')
            if next_url:
                del request.session['next_url']
                return redirect(next_url)
            else:
                return redirect('/')
            
        if signup_form.is_valid():
            user = signup_form.save(request)
            login(request, user, backend='user_accounts.backends.CustomBackend')
            if next_url:
                del request.session['next_url']
                return redirect(next_url)
            else:
                return redirect('/')
        
    else:
        login_form = LoginForm()
        signup_form = CustomUserCreationForm()
    
    return render(request, 'accounts/login_or_signup.html', {'login_form': login_form, 'signup_form': signup_form})

class CusSignupView(SignupView):
    template_name = 'accounts/signup.html'


class CusLoginView(LoginView):
    template_name = 'accounts/login.html'