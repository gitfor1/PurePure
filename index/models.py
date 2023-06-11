"""
2020 Black
developer : #ABS
"""

# Import all requirements
from wagtail.images.models import Image, AbstractImage, AbstractRendition
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.contrib.taggit import ClusterTaggableManager
from wagtail.snippets.models import register_snippet
from django.shortcuts import render, redirect
from wagtail.models import Page, PageManager
from wagtail.admin.panels import FieldPanel
from wagtail.fields import RichTextField
from rest_framework.fields import Field
from taggit.forms import TagField
from wagtail.api import APIField
from wagtail.search import index
from django.db import models

# INDEX PAGE MANAGER
class IndexPageManager(PageManager):
    '''
    DEVELOPMENT : #ABS
     '''
    pass


# Index class
class Index(Page):
    body = RichTextField(blank=True)
    description = models.TextField(verbose_name='توضیجات', db_index=True, null=True, blank=True)
    keywords = models.TextField(verbose_name='کلید واژه صفحه اصلی', db_index=True, null=True, blank=True)

    objects = IndexPageManager()

    max_count = 1

    content_panels = Page.content_panels + [
        FieldPanel('body'),
        FieldPanel('keywords'),
        FieldPanel('description'),
    ]

    def get_template(self, request, *args, **kwargs):

        return 'index/index.html'

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)

    def serve(self, request, *args, **kwargs):
        return render(
            request,
            self.get_template(request, *args, **kwargs),
            self.get_context(request, *args, **kwargs),
        )

    class Meta:
        verbose_name = "خانه"


@register_snippet
class Comments(models.Model):
    title = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    love = models.PositiveIntegerField(verbose_name='امتیاز', blank=False, null=False)
    email = models.EmailField()
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'بازخورد کاربر'
        verbose_name_plural = 'بازخورد کاربران'