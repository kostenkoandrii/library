from django.urls import include, path, re_path
from rest_framework import routers

from .api import BookViewSet

router = routers.DefaultRouter()
router.register(r'book', BookViewSet, basename='book')

urlpatterns = [
    path('', include(router.urls)),
    re_path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.jwt')),
]
