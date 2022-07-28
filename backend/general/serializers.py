from django.core.files.images import get_image_dimensions
import os
from rest_framework import serializers

# import models
from .models import MediaGallery


class MediaGallerySerializer(serializers.ModelSerializer):
    filename = serializers.SerializerMethodField(read_only=True)
    size = serializers.SerializerMethodField(read_only=True)
    ext = serializers.SerializerMethodField(
        method_name="get_extension", read_only=True)
    dimensions = serializers.SerializerMethodField(
        method_name="get_dimensions", read_only=True)

    class Meta:
        model = MediaGallery
        fields = ["id", "file", "filename",
                  "created_at", "main", "alt", "title", "size", "ext", "dimensions"]

    def get_product_image(self, obj):
        request = self.context.get("request")
        if not request is None:
            url = request.build_absolute_uri(obj.file.url)
            obj.file.file.close()
            return url

    def get_filename(self, obj):
        return os.path.basename(obj.file.name)

    def get_size(self, obj):
        return os.path.getsize(obj.file.path)

    def get_extension(self, obj):
        name, extension = os.path.splitext(obj.file.name)
        return extension

    def get_dimensions(self, obj):
        width, height = get_image_dimensions(obj.file)
        return width, height
