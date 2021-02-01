from django.contrib import admin
from .models import Book


class BookAdmin(admin.ModelAdmin):
    model = Book
    list_display = ['id', 'author', 'title', 'description', 'poster_image', 'created_by']
    list_display_links = ('title', 'author')
    search_fields = ['author']


admin.site.register(Book, BookAdmin)
