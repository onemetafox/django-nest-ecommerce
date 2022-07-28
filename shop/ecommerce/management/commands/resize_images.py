
__copyright__ = 'Copyright 2022, Jesus Abril'
import os

from io import StringIO, BytesIO
from PIL import Image

from django.core.management import BaseCommand
from django.conf import settings

# Models
from ecommerce.models import ProductImage, EngravedArea


def get_product_image_upload_path(provider, filename):
    """Product image upload directory path"""
    return 'images/product/{0}/{1}'.format(provider, filename)


def get_product_thumbnail_upload_path(provider, filename):
    """Product thumbnail image upload directory path"""
    return 'images/product/{0}/thumbnail/{1}'.format(provider, filename)


def get_engraved_area_image_upload_path(provider, filename):
    return 'images/product/{0}/engraved-area/{0}'.format(provider, filename)


class Command(BaseCommand):
    images = None

    def resize_images(self, provider):
        frame_size = 1080, 1080
        size = 1000, 1000
        images = ProductImage.objects.all()

        for image in images:
            img_path = os.path.join(
                settings.MEDIA_ROOT, image.product_image.name)
            img_filename = os.path.basename(image.product_image.name)

            if img_filename.startswith("r_"):
                return

            with Image.open(img_path) as img:
                width, height = img.size

                relative_path = get_product_image_upload_path(
                    provider, "r_"+img_filename)
                new_path = os.path.join(
                    settings.MEDIA_ROOT, relative_path)

                img.thumbnail(size, Image.ANTIALIAS)
                new_size = img.size
                offset = ((frame_size[0] - new_size[0]) //
                          2, (frame_size[0] - new_size[1]) // 2)
                frame = Image.new("RGB", frame_size, "white")

                frame.paste(img, offset)
                img = frame

                img.save(new_path, optimize=True, quality=60)
                os.remove(img_path)

                image.product_image = relative_path
                image.save()

    def resize_tech_and_areas_images(self, provider):
        size = 500, 500
        areas = EngravedArea.objects.all()

        for area in areas:
            img_path = os.path.join(
                settings.MEDIA_ROOT, area.image.name)
            img_filename = os.path.basename(area.image.name)

            if img_filename.startswith("r_"):
                return

            with Image.open(img_path) as img:
                width, height = img.size

                relative_path = get_engraved_area_image_upload_path(
                    provider, "r_"+img_filename)
                new_path = os.path.join(
                    settings.MEDIA_ROOT, relative_path)

                img.thumbnail(size, Image.ANTIALIAS)
                img.save(new_path, optimize=True, quality=60)
                os.remove(img_path)

                area.image = relative_path
                area.save()

    def add_arguments(self, parser):
        parser.add_argument('--provider')
        parser.add_argument('--tecnicas', help='Introduce el proveedor')

    def handle(self, *args, **options):
        provider = options['provider']
        techniques = options["tecnicas"]

        if provider:
            self.resize_images(provider)
        if techniques:
            self.resize_tech_and_areas_images(techniques)
