from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .models import Book
from .permissions import IsOwner
from .serializers import BookSerializer


class PagesPaginator(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    last_page_strings = ('last',)
    max_page_size = 40

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


class BookViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.CreateModelMixin,
                        mixins.DestroyModelMixin, mixins.ListModelMixin, GenericViewSet):
    """
        Controller for users books model.
        User can do actions with books such as:
        create, update, delete, get list of books, get selected books
    """
    permission_classes = [IsAuthenticated, IsOwner]
    serializer_class = BookSerializer
    pagination_class = PagesPaginator

    def get_queryset(self):
        user = self.request.user
        return Book.objects.filter(created_by=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(created_by=user)
