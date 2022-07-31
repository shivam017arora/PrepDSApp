from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path("posts/", views.PostListView.as_view(), name="posts"),
    path("posts/<str:slug>/", views.PostDetailView.as_view(), name="post"),
    path("comments/<str:slug>/", views.CommentView.as_view(), name="commentsview"),
    path(
        "comments/<str:slug>/create/",
        views.CommentCreateView.as_view(),
        name="commentscreateview",
    ),
    path(
        "comments/update/<int:pk>/",
        views.CommentUpdateView.as_view(),
        name="commentsupdateview",
    ),
    path("search/", views.PostListDetailFilter.as_view(), name="postssearch"),
    path("create/", views.CreatePostView.as_view(), name="createpost"),
]
