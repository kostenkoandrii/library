import os

from django.contrib.auth.models import User
from django.db import models


def posters_dir(instance, filename):
    return os.path.join('posters', filename)


class Book(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='own_books')
    author = models.CharField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    poster_image = models.ImageField(null=True, blank=True, upload_to=posters_dir)
