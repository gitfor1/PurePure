from wagtail.contrib.routable_page.models import RoutablePageMixin
from user_accounts.models import user_accounts as User
from wagtail.snippets.models import register_snippet
from django.db.models import PROTECT, SET_NULL
from django.shortcuts import render, redirect
from wagtail.models import Page, PageManager
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from django.utils import timezone
from wagtail.api import APIField
from wagtail.search import index
from django.db import models


# Category Page Manager
class BrandPageManager(PageManager):
    ''' 
    DEVELOPMENT BY #ABS 
    '''
    pass


# Category app index model
class BrandIndex(Page, RoutablePageMixin):
    intro = RichTextField(blank=True, verbose_name='نام صفحه برند های سایت')
    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]
    max_count = 1
    objects = CategoryPageManager()
    content_panels = Page.content_panels + [
        FieldPanel('intro')
    ]

    subpage_types = ['brand.BrandPage',]

    parent_page_types = ['index.Index']


    def get_template(self, request, *args, **kwargs):
        ajax_template = 'brand/brand_archive/brand_archive.html'
        return ajax_template

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        loaded_brand = BrandPage.objects.live().public().order_by('-first_published_at')
        context['posts'] = loaded_brand if loaded_brand is not None else 0
        return context

    def serve(self, request, *args, **kwargs):
        return render(
            request,
            self.get_template(request, *args, **kwargs),
            self.get_context(request, *args, **kwargs),
        )

    class Meta:
        verbose_name = 'صفحه آرشیو برند ها'


class BrandPage(Page, RoutablePageMixin):
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL,)
    keywords = models.CharField(max_length=300, verbose_name='کلید واژه برند')
    description = models.CharField(max_length=300, verbose_name='توضیحات کامل برند')

    subpage_types = []

    parent_page_types = ['brand.BrandIndex']

    content_panels = Page.content_panels + [
        FieldPanel('description'),
        FieldPanel('keywords'),
        FieldPanel('collection'),
    ]

    api_fields = [
        APIField('description'),
        APIField('collection'),
    ]

    search_fields = Page.search_fields + [
        index.SearchField('description'),
        index.SearchField('collection'),
    ]

    def get_template(self, request, *args, **kwargs):
        ajax_template = 'brand/brand_single/brand_single.html'
        return ajax_template

    def serve(self, request, *args, **kwargs):
        return render(
            request,
            self.get_template(request, *args, **kwargs),
        )

    class Meta:
        verbose_name = 'برند'
        verbose_name_plural = 'برند ها '