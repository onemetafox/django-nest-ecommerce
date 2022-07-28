
from general.models import MediaGallery
from ecommerce.models import EngravingArea
from django.conf import settings
from django.core.management import BaseCommand
__copyright__ = 'Copyright 2022, Jesus Abril'

import os

from PIL import Image, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

# Models


def get_product_image_upload_path(provider, slug, filename):
    """Product image upload directory path"""
    return 'images/product/{0}/{1}/{2}'.format(provider, slug, filename)


def get_product_thumbnail_upload_path(provider, filename):
    """Product thumbnail image upload directory path"""
    return 'images/product/{0}/thumbnail/{1}'.format(provider, filename)


def get_engraved_area_image_upload_path(provider, filename):
    return 'images/product/{0}/engraved-area/{1}'.format(provider, filename)


class Command(BaseCommand):
    images = None

    def resize_images(self):
        frame_size = 1080, 1080
        size = 1000, 1000

        """ PRODUCTS """
        images = MediaGallery.objects.all()
        for image in images:

            if image.resized:
                continue

            img_path = os.path.join(
                settings.MEDIA_ROOT, image.file.name)
            try:
                with Image.open(img_path) as img:

                    new_path = os.path.join(
                        settings.MEDIA_ROOT, img_path)

                    if image.file.name.find("thumbnail") > -1:
                        size = 600, 600
                        frame_size = 680, 680

                    img.thumbnail(size, Image.ANTIALIAS)
                    new_size = img.size
                    offset = ((frame_size[0] - new_size[0]) //
                              2, (frame_size[0] - new_size[1]) // 2)
                    frame = Image.new("RGB", frame_size, "white")

                    frame.paste(img, offset)
                    img = frame

                    img.save(new_path, optimize=True,
                             quality=60)

                    image.resized = True
                    image.save()

            except FileNotFoundError:
                image.delete()
                continue
            except:
                image.delete()
                continue

    def resize_tech_and_areas_images(self, provider):
        area_size = (500, 500)
        areas = EngravingArea.objects.all()

        for area in areas:
            try:
                img_filename = os.path.basename(area.image.name)

                if img_filename.startswith("r_"):
                    raise Exception

                img_path = os.path.join(
                    settings.MEDIA_ROOT, area.image.name)

                with Image.open(img_path) as img:
                    relative_path = get_engraved_area_image_upload_path(
                        provider, "r_"+img_filename)
                    new_path = os.path.join(
                        settings.MEDIA_ROOT, relative_path)

                    img.convert('RGB')
                    img.thumbnail(area_size, Image.ANTIALIAS)

                    img.save(new_path, optimize=True, quality=85)
                    os.remove(img_path)

                    area.image = relative_path
                    area.save()

            except:
                relative_path = get_engraved_area_image_upload_path(
                    provider, img_filename)

                if area.image.name == relative_path:
                    continue
                else:
                    relative_path = get_engraved_area_image_upload_path(
                        provider, "r_"+img_filename)
                    area.image = relative_path
                    area.save()
                    continue

    def add_arguments(self, parser):
        parser.add_argument('--provider')
        parser.add_argument('--tecnicas', help='Introduce el proveedor')

    def handle(self, *args, **options):

        provider = options['provider']
        techniques = options["tecnicas"]

        if provider:
            self.resize_images()
        if techniques:
            self.resize_tech_and_areas_images(techniques)
