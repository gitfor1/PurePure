'''
۲۰۲۰ Black Users Database Model
'''

# Import all requirements
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.cache import cache
from django.conf import settings
from django.db import models
from django import forms


# Custom User Manager class
class CustomUserManager(BaseUserManager):
    def create_user(self, phoneNumber, password=None, **extra_fields):
        if not phoneNumber:
            raise ValueError('شماره تماس باید وارد شود')
        user = self.model(phoneNumber=phoneNumber, **extra_fields)
        user.set_password(password)
        user.has_new_password = True
        user.save(using=self._db)
        return user
    
    def create_superuser(self, phoneNumber, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('has_new_password', True)
        return self.create_user(phoneNumber, password, **extra_fields)


class user_accounts(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(db_column='id',primary_key=True, unique=True)
    email = models.CharField(db_column='email',max_length=120, unique=True, null=True)
    username = models.CharField(db_column='username',max_length=120, unique=True, null=True)
    WPOPass = models.CharField(db_column='WPOPass',max_length=100, default=False, null=True)
    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    address2 = models.CharField(max_length=200,blank=True, null=True)
    ostan = models.CharField(max_length=100,blank=True, null=True)
    shahr = models.CharField(max_length=100,blank=True, null=True)
    zip_code = models.CharField(max_length=10)
    phoneNumber = models.CharField(db_column='phoneNumber', max_length=20, unique=True)
    is_active = models.BooleanField(db_column='is_active',default=True)
    is_staff = models.BooleanField(db_column='is_staff',default=False)
    date_joined = forms.DateTimeField(
        label='Date Joined',
        widget=forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        disabled=True  
    )
    last_login = models.DateTimeField(db_column='last_login',auto_now_add=True)
    has_new_password = models.BooleanField(db_column='has_new_password',default=True)

    USERNAME_FIELD = 'phoneNumber'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
            return self.phoneNumber
            

    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران سایت'
