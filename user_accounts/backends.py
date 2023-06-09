"""
Custom backend for users authentication.
developer : #ABS
"""

# Import all requirements  
from django.contrib.auth.backends import ModelBackend
from django.shortcuts import redirect, reverse
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from .models import user_accounts
from django.db.models import Q
from typing import Optional


# CustomBackend class
class CustomBackend(ModelBackend):
    # function authenticate
    def authenticate(self, request, username=None, password=None,has_new_password = None, WPOPass = None, **kwargs) -> Optional[get_user_model()]:
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(Q(username=username) | Q(email=username))| Q(phoneNember=username)
        except UserModel.DoesNotExist:
            return None
        else:
            # Check if the provided password is valid for the user
            if user.check_password(password):
                return user
        return None