from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from blog.models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework import viewsets, generics, filters, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser


class PostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CreatePostView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_object(self):
        slug = self.kwargs.get("slug")
        return get_object_or_404(Post, slug=slug)


class CommentView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        slug = self.kwargs.get("slug")
        return Comment.objects.filter(post__slug=slug)


class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        slug = self.kwargs.get("slug")
        post = get_object_or_404(Post, slug=slug)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(post=post)
        return HttpResponse("OK", status=200)


class CommentUpdateView(generics.UpdateAPIView):
    serializer_class = CommentSerializer

    def get_object(self):
        pk = self.kwargs.get("pk")
        return get_object_or_404(Comment, pk=pk)


class PostListDetailFilter(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["^title"]
