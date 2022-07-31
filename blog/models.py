from django.utils.translation import gettext_lazy as _
from django.db import models
from django.utils import timezone
from users.models import NewUser

# Create your models here.


def upload_to(instance, filename):
    return "posts/{filename}".format(filename=filename)


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Post(models.Model):
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status="published")

    options = (
        ("draft", "Draft"),
        ("published", "Published"),
    )

    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=100)
    image = models.ImageField(_("Image"), upload_to=upload_to, blank=True, null=True)
    excerpt = models.TextField(null=True)
    content = models.TextField()
    # field for refering other than id
    slug = models.SlugField(max_length=250, unique_for_date="published")
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, related_name="blog_posts"
    )
    status = models.CharField(max_length=10, choices=options, default="published")
    objects = models.Manager()
    postobjects = PostObjects()

    class Meta:
        ordering = ("-published",)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comment_post"
    )
    author = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, related_name="comment_author"
    )
    content = models.TextField(null=False)
    upvotes = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return f"Comment by {self.author} on {self.post}"
