
from django.core.exceptions import ValidationError
from django.db import models
from datetime import datetime
from django.core.validators import FileExtensionValidator

from ecommerce.models import Product

# Get media upload directory path


def get_media_file_upload_path(instance, filename):
    year = datetime.now().year
    return 'uploads/{0}/{1}'.format(year, filename)


def file_size(value):  # add this to some file where you can import it from
    limit = 12 * 1024 * 1024
    if value.size > limit:
        raise ValidationError(
            'File too large. Size should not exceed 15 MiB.')


class MediaGallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE,
                                null=True, blank=True, related_name='product_image')
    file = models.FileField(
        null=True, blank=True, upload_to=get_media_file_upload_path, validators=[
            FileExtensionValidator(['png', 'jpg', 'jpeg', "gif", "pdf"]), file_size]
    )
    title = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    alt = models.CharField(
        max_length=250, null=True, blank=True, default=None)
    main = models.BooleanField(default=False)
    resized = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = "media_gallery"
        ordering = ['-created_at']

    def save(self, *args, **kwargs) -> None:
        if not self.alt:
            alt = ""
            if self.product:
                alt = f"{self.product.product_name} personalizable" or "Imágen PubliEXPE"
            if len(alt) == 0:
                self.alt = alt
            else:
                self.alt = "Imágen PubliEXPE"
        if not self.title:
            self.title = self.alt
        if self.main and self.product:
            try:
                temp = MediaGallery.objects.filter(
                    product=self.product, main=True)
                for t in temp:
                    if self != t:
                        t.main = False
                        t.save()
            except MediaGallery.DoesNotExist:
                pass
        self.clean()
        return super().save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        self.file.storage.delete(self.file.name)
        super().delete()
