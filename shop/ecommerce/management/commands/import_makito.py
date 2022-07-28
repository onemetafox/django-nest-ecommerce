__copyright__ = 'Copyright 2022, Jesus Abril'
import urllib3
import shutil
import os
import sys

from os.path import exists
from lxml import etree
from io import StringIO, BytesIO
from PIL import Image
from datetime import datetime

from django.utils import timezone
from django.core.files import File
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand, CommandError
from django.template.defaultfilters import slugify
from django.conf import settings

# Models
from ecommerce.models import Category, Product, Color, Size, ProductImage, EngravingTechnique, EngravedArea
from ecommerce.serializers import CategorySerializer, ProductSerializer, ColorSerializer, SizeSerializer
from dashboard.models import Provider
from dashboard.serializers import ProviderSerializer

# Constant
http = urllib3.PoolManager()


def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.filter(*args, **kwargs)
    except model.DoesNotExist:
        return None


def get_product_image_upload_path(filename):
    """Product image upload directory path"""
    return 'images/product/makito/{0}'.format(filename)


def get_product_thumbnail_upload_path(filename):
    """Product thumbnail image upload directory path"""
    return 'images/product/makito/thumbnail/{0}'.format(filename)


def get_engraved_area_image_upload_path(filename):
    return 'images/product/makito/engraved-area/{0}'.format(filename)


def progress(count, total, suffix=''):
    bar_len = 60
    filled_len = int(round(bar_len * count / float(total)))

    percents = round(100.0 * count / float(total), 1)
    bar = '=' * filled_len + '-' * (bar_len - filled_len)

    sys.stdout.write('[%s] %s%s ...%s\r ' %
                     (bar, percents, '%', suffix))
    sys.stdout.flush()


class Command(BaseCommand):
    args = '<ruta hasta el CSV>'
    help = 'importar csv'

    saved_products = []
    category_tree = []

    category_serializer = CategorySerializer
    product_serializer = ProductSerializer
    color_serializer = ColorSerializer
    size_serializer = SizeSerializer

    makito_settings = Provider.objects.get(slug="makito")

    parser = etree.XMLParser(remove_blank_text=True)
    products = "http://print.makito.es:8080/user/xml/ItemDataFile.php?pszinternal=00014583259298920141216033&ldl=esp"
    stock = "http://print.makito.es:8080/user/xml/allstockfile.php?pszinternal=00014583259298920141216033"
    prices = "http://print.makito.es:8080/user/xml/PriceListFile.php?pszinternal=00014583259298920141216033"
    engrave_tecnics = "http://print.makito.es:8080/user/xml/ItemPrintingFile.php?pszinternal=00014583259298920141216033&ldl=esp"

    def import_products(self, download_images):
        response = http.request('GET', self.products)
        tree = etree.parse(BytesIO(response.data))
        root = tree.getroot()

        print("\n ======== >>>> Importing MAKITO executed <<<<  ========")

        for i, elem in enumerate(root):
            new_product = {}
            progress(i, len(root)-1)

            root_reference = elem.find("ref").text if elem.find(
                "ref") is not None else None
            product_name = elem.find("name").text if elem.find(
                "ref") is not None else None
            type = elem.find("type").text if elem.find(
                "type") is not None else None
            product_name = type + " - " + product_name

            product_description = elem.find("extendedinfo").text if elem.find(
                "extendedinfo") is not None else None
            product_description_additional = elem.find("otherinfo").text if elem.find(
                "otherinfo") is not None else None
            provider = "MAKITO"
            material = elem.find("composition").text if elem.find(
                "composition") is not None else None
            weight = elem.find("item_weight").text if elem.find(
                "item_weight") is not None else None
            depth = elem.find("item_long").text if elem.find(
                "item_long") is not None else None
            width = elem.find("item_width").text if elem.find(
                "item_width") is not None else None
            height = elem.find("item_hight").text if elem.find(
                "item_hight") is not None else None
            box_units = elem.find("masterbox_units").text if elem.find(
                "masterbox_units") is not None else 0
            box_weight = elem.find("masterbox_weight").text if elem.find(
                "masterbox_weight") is not None else None
            masterbox_long = elem.find("masterbox_long").text if elem.find(
                "masterbox_long") is not None else None
            masterbox_hight = elem.find("masterbox_hight").text if elem.find(
                "masterbox_hight") is not None else None
            masterbox_width = elem.find("masterbox_width").text if elem.find(
                "masterbox_width") is not None else None
            box_dimension = masterbox_long + "x" + \
                masterbox_hight + "x" + masterbox_width
            minimum_order = elem.find("order_min_product").text if elem.find(
                "order_min_product") is not None else 1
            pallet_box = elem.find("palet_boxs").text if elem.find(
                "palet_boxs") is not None else None
            pallet_units = elem.find("palet_units").text if elem.find(
                "palet_units") is not None else None
            pallet_weight = elem.find("palet_weight").text if elem.find(
                "palet_weight") is not None else None
            link_360 = elem.find("link360").text if elem.find(
                "link360") is not None else None
            link_video1 = elem.find("linkvideo").text if elem.find(
                "linkvideo") is not None else None
            tags = elem.find("keywords").text if elem.find(
                "keywords") is not None else None
            tags = tags.split(",") if tags is not None else None
            normalize_tags = []
            if len(tags):
                for tag in tags:
                    normalize_tags.append(tag.strip().lower().capitalize())
            tags = normalize_tags if len(normalize_tags) > 0 else None

            """ CATEGORY """
            self.category_tree = ""
            sub_categories = []
            categories = elem.find('categories')
            if categories is not None:
                for i, cat in enumerate(categories):
                    category_name = categories.find("category_name_"+str(i)).text if categories.find(
                        "category_name_"+str(i)) is not None else None
                    category_id = categories.find("category_ref_"+str(i)).text if categories.find(
                        "category_ref_"+str(i)) is not None else None

                    category_id = "<" + category_id + ">" if category_id is not None else None

                    # Check if category already exists
                    if category_id is not None and category_name is not None:
                        category_name = category_name.replace(
                            "\n", "").lower().capitalize()
                        self.category_tree += category_id + ","
                        slug = slugify(category_name)
                        category = get_or_none(
                            Category, slug=slug)
                        # First create categoy
                        if len(category) == 0:
                            new_category = {
                                "category_name": category_name, "is_active": True, "show_in_menu_list": True, "is_favorite": False, "makito_id":  self.category_tree}
                            serializer = self.category_serializer(
                                Category(), data=new_category)
                            serializer.is_valid(raise_exception=True)
                            category = serializer.save()
                            new_product["category"] = category
                        else:
                            try:
                                category = Category.objects.get(
                                    slug=slug)
                            except Category.DoesNotExist:
                                category = Category.objects.get(
                                    slug=category.first().slug)

                            if not new_product.__contains__("category"):
                                new_product["category"] = category
                            else:
                                sub_categories.append(category)

            """ VARIANTS
            variants are related by root_reference
            """
            sub_categories = list(filter(None, sub_categories))
            variants = elem.find("variants")
            saved_thumb_names = list()
            if variants is not None:
                for variant in variants:
                    refct = variant.find("refct").text if variant.find(
                        "refct") is not None else None
                    product = get_or_none(
                        Product, reference=refct, provider="MAKITO")
                    if len(product) == 0:
                        """ COLORS """
                        colour = variant.find("colour").text if variant.find(
                            "colour") is not None else None
                        color_name = variant.find("colourname").text if variant.find(
                            "colourname") is not None else None
                        slug = slugify(color_name or "S/C")
                        color_to_check = get_or_none(
                            Color, slug=slug)
                        if len(color_to_check) == 0:
                            #  Create the the new color
                            new_color = {
                                "color_name": color_name or "S/C",
                                "description": color_name or "S/C",
                                "makito_color": colour or "S/C"
                            }
                            serializer = self.color_serializer(
                                Color(), data=new_color)
                            serializer.is_valid(raise_exception=True)
                            color = serializer.save()
                            new_product["color"] = color
                        else:
                            color = Color.objects.get(slug=slug)
                            new_product["color"] = color

                        """ SIZES """
                        size_name = variant.find("size").text if variant.find(
                            "size") is not None else None
                        slug = slugify(size_name or "S/T")
                        size_to_check = get_or_none(
                            Size, slug=slug)
                        if len(size_to_check) == 0:
                            # create new Size
                            new_size = {
                                "size_name": size_name,
                                "makito_size": size_name,
                            }
                            serializer = self.size_serializer(
                                Size(), data=new_size)
                            serializer.is_valid(raise_exception=True)
                            size = serializer.save()
                            new_product["size"] = size
                        else:
                            size = Size.objects.get(slug=slug)
                            new_product["size"] = size

                        """ MAIN IMAGE """
                        image500_url = variant.find("image500px").text if variant.find(
                            "image500px") is not None else None
                        if image500_url is not None:
                            filename = image500_url.split("/")[-1]
                            product_image_url = get_product_thumbnail_upload_path(
                                filename)
                            file_exists = exists(os.path.join(
                                settings.MEDIA_ROOT, product_image_url))
                            saved = filename in saved_thumb_names
                            if not (file_exists or saved):
                                os.umask(0)
                                image_dir = os.path.join(
                                    settings.MEDIA_ROOT, "images/product/makito/thumbnail/")
                                if not os.path.exists(image_dir):
                                    os.makedirs(image_dir, mode=777)
                                else:
                                    with http.request('GET', image500_url, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                        out_file.write(r.data)
                                        saved_thumb_names.append(filename)

                            new_product["product_thumbnail_image"] = product_image_url
                            new_product["product_image_url"] = image500_url

                    """ NEW PRODUCT """

                    if len(product) == 0:
                        new_product["product_name"] = product_name
                        new_product["product_description"] = product_description
                        new_product["product_description_additional"] = product_description_additional
                        new_product["sub_category"] = sub_categories or None
                        new_product["reference"] = refct
                        new_product["root_reference"] = root_reference
                        new_product["provider"] = provider
                        new_product["material"] = material
                        new_product["weight"] = weight or 0.00
                        new_product["depth"] = depth or 0.00
                        new_product["width"] = width or 0.00
                        new_product["height"] = height or 0.00
                        new_product["box_units"] = box_units or 0
                        new_product["box_weight"] = box_weight or 0.00
                        new_product["box_dimension"] = box_dimension
                        new_product["minimum_order"] = minimum_order or 1
                        new_product["pallet_box"] = pallet_box or 0
                        new_product["pallet_units"] = pallet_units or 0.00
                        new_product["pallet_weight"] = pallet_weight or 0.00
                        new_product["link_360"] = link_360
                        new_product["link_video1"] = link_video1
                        new_product["tags"] = tags

                        product = Product.objects.create(category=new_product["category"], color=new_product["color"], size=new_product["size"], product_name=new_product["product_name"], product_description=new_product["product_description"], product_description_additional=new_product["product_description_additional"], product_image_url=new_product["product_image_url"], reference=new_product["reference"], root_reference=new_product["root_reference"], provider=new_product["provider"], material=new_product["material"], weight=new_product[
                                                         "weight"], depth=new_product["depth"], width=new_product["width"], height=new_product["height"], box_units=new_product["box_units"], box_weight=new_product["box_weight"], box_dimension=new_product["box_dimension"], minimum_order=new_product["minimum_order"], pallet_box=new_product["pallet_box"], pallet_units=new_product["pallet_units"], pallet_weight=new_product["pallet_weight"], link_360=new_product["link_360"], link_video1=new_product["link_video1"], tags=new_product["tags"], is_published=False, is_featured=True, is_new=True)
                        product.sub_category.set(sub_categories)
                        if new_product.__contains__("product_thumbnail_image"):
                            product.product_thumbnail_image = new_product["product_thumbnail_image"]

                        product.save()

                    else:
                        # Check for updates
                        product = Product.objects.get(
                            reference=refct, provider=provider)
                        product.product_description = product_description or product.product_description
                        product.product_description_additional = product_description_additional or product.product_description_additional
                        product.sub_category.set(sub_categories)
                        product.reference = refct
                        product.root_reference = root_reference
                        product.weight = weight or product.weight
                        product.depth = depth or product.depth
                        product.width = width or product.width
                        product.height = height or product.height
                        product.box_units = box_units or product.box_units
                        product.box_weight = box_weight or product.box_weight
                        product.box_dimension = box_dimension or product.box_dimension
                        product.minimum_order = minimum_order or product.minimum_order
                        product.pallet_box = pallet_box or product.pallet_box
                        product.pallet_units = pallet_units or product.pallet_units
                        product.pallet_weight = pallet_weight or product.pallet_weight
                        product.link_360 = link_360 or product.link_360
                        product.link_video1 = link_video1 or product.link_video1
                        product.tags = tags or product.tags
                        product.is_featured = False
                        product.is_new = False

                        product.save()

                    self.saved_products.append(refct)

            """ IMAGES ENVIORMENT """
            images = elem.find("images_environment")
            if images is not None:
                for i, image in enumerate(images):
                    # Max 4 images for product
                    if not i > 3:
                        img = image.text if image is not None else None
                        if img is not None:
                            filename = img.split("/")[-1]
                            product_image_url = get_product_image_upload_path(
                                filename)
                            file_exists = exists(os.path.join(
                                settings.MEDIA_ROOT, product_image_url))
                            product_image_url_resized = get_product_image_upload_path(
                                "r_"+filename)
                            file_resized_exists = exists(os.path.join(
                                settings.MEDIA_ROOT, product_image_url_resized))
                            if not (file_exists or file_resized_exists):
                                os.umask(0)
                                image_dir = os.path.join(
                                    settings.MEDIA_ROOT, "images/product/makito/")
                                if not os.path.exists(image_dir):
                                    os.makedirs(image_dir, mode=777)
                                else:
                                    with http.request('GET', img, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                        shutil.copyfileobj(r, out_file)
                                        ProductImage.objects.create(
                                            product=product, product_image=product_image_url)

            """ IMAGES """
            images = elem.find("images")
            if images is not None:
                for i, image in enumerate(images):
                    # Max 4 images for product
                    if not i > 3:
                        imagemax = image.find("imagemax").text if image.find(
                            "imagemax") is not None else None
                        if imagemax is not None:
                            filename = imagemax.split("/")[-1]
                            product_image_url = get_product_image_upload_path(
                                filename)
                            file_exists = exists(os.path.join(
                                settings.MEDIA_ROOT, product_image_url))
                            product_image_url_resized = get_product_image_upload_path(
                                "r_"+filename)
                            file_resized_exists = exists(os.path.join(
                                settings.MEDIA_ROOT, product_image_url_resized))
                        if not (file_exists or file_resized_exists):
                            os.umask(0)
                            image_dir = os.path.join(
                                settings.MEDIA_ROOT, "images/product/makito/")
                            if not os.path.exists(image_dir):
                                os.makedirs(image_dir, mode=777)
                            else:
                                with http.request('GET', imagemax, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                    shutil.copyfileobj(r, out_file)
                                    ProductImage.objects.create(
                                        product=product, product_image=product_image_url)

        products_to_delete = Product.objects.filter(provider="MAKITO")
        products_to_delete = products_to_delete.exclude(
            reference__in=self.saved_products)

        if len(products_to_delete):
            for product in products_to_delete:
                product.delete()

        """ RESIZE IMAGES """
        os.system("python .\manage.py resize_images --provider makito")

        """ UPDATE PROVIDER """
        self.makito_settings.last_imported = timezone.now()
        self.makito_settings.type = ["Productos", "Imágenes"]
        self.makito_settings.save()

        print("\n\n ======== >>>> Finished <<<<  ========")

    saved_techniques = []
    saved_areas = []

    def import_engrave_technics(self):
        response = http.request('GET', self.engrave_tecnics)
        tree = etree.parse(BytesIO(response.data))
        root = tree.getroot()

        print("\n ======== >>>> Importing MAKITO TECNICAS executed <<<<  ========")

        for i, elem in enumerate(root):
            progress(i, len(root)-1)

            root_reference = elem.find("ref").text if elem.find(
                "ref") is not None else None

            products = get_or_none(
                Product, root_reference=root_reference, provider="MAKITO")

            if len(products) > 0:

                """ TECHNIQUE """
                printjobs = elem.find("printjobs")
                saved_thumb_names = list()
                if printjobs is not None:
                    for printjob in printjobs:

                        teccode = printjob.find("teccode").text if printjob.find(
                            "teccode") is not None else None
                        tecname = printjob.find("tecname").text if printjob.find(
                            "tecname") is not None else None
                        max_color = printjob.find("maxcolour").text if printjob.find(
                            "maxcolour") is not None else None
                        included_color = printjob.find("includedcolour").text if printjob.find(
                            "includedcolour") is not None else None
                        code_makito = "<" + teccode + ">"

                        engraving_technique = get_or_none(
                            EngravingTechnique, code_makito__icontains=code_makito)
                        if len(engraving_technique) == 0:
                            engraving_technique = EngravingTechnique.objects.create(
                                code_makito=code_makito, engraving_technique_name=tecname, max_color=max_color, included_color=included_color)
                            self.saved_techniques.append(engraving_technique)
                        else:
                            engraving_technique = engraving_technique.first()
                            self.saved_techniques.append(engraving_technique)

                        """ AREA """
                        areas = printjob.find("areas")
                        if areas is not None:
                            for area in areas:
                                areacode = area.find("areacode").text if area.find(
                                    "areacode") is not None else None
                                areaname = area.find("areaname").text if area.find(
                                    "areaname") is not None else None
                                areawidth = area.find("areawidth").text if area.find(
                                    "areawidth") is not None else 0
                                areahight = area.find("areahight").text if area.find(
                                    "areahight") is not None else 0
                                areaimg = area.find("areaimg").text if area.find(
                                    "areaimg") is not None else None

                                """ MAIN IMAGE """
                                image = None
                                if areaimg is not None:
                                    filename = areaimg.split(
                                        "/")[-1].rstrip()
                                    product_image_url = get_engraved_area_image_upload_path(
                                        filename)
                                    file_exists = exists(os.path.join(
                                        settings.MEDIA_ROOT, product_image_url))
                                    saved = filename in saved_thumb_names
                                    if not (file_exists or saved):
                                        os.umask(0)
                                        image_dir = os.path.join(
                                            settings.MEDIA_ROOT, "images/product/makito/engraved-area/")
                                        if not os.path.exists(image_dir):
                                            os.makedirs(image_dir, mode=777)
                                        else:
                                            with http.request('GET', areaimg, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                                out_file.write(r.data)
                                                saved_thumb_names.append(
                                                    filename)

                                    image = product_image_url

                                engraved_area = get_or_none(
                                    EngravedArea, engraving_technique=engraving_technique, code_makito=code_makito)
                                if len(engraved_area) == 0:
                                    code_makito = slugify("%s%s%s%s" % (
                                        areacode, areaname, areawidth, areahight))
                                    for product in products:
                                        engraved_area = EngravedArea.objects.create(
                                            product=product, engraving_technique=engraving_technique, name=areaname, code_makito=code_makito, width=areawidth, height=areahight)

                                        if image is not None:
                                            engraved_area.image = image

                                        engraved_area.save()
                                        self.saved_areas.append(engraved_area)

        """ RESIZE IMAGES """
        os.system("python .\manage.py resize_images --tecnicas makito")

        """ UPDATE PROVIDER """
        self.makito_settings.last_imported = timezone.now()
        self.makito_settings.type = ["Técnicas, Áreas"]
        self.makito_settings.save()

        print("\n\n ======== >>>> Finished <<<<  ========")

    def update_stock(self):
        response = http.request('GET', self.stock)
        tree = etree.parse(BytesIO(response.data))
        root = tree.getroot()

        print("\n ======== >>>> Updating MAKITO SOTCK executed <<<<  ========")

        for i, elem in enumerate(root):
            progress(i, len(root)-1)

            root_reference = elem.find("ref").text if elem.find(
                "ref") is not None else None
            reference = elem.find("reftc").text if elem.find(
                "reftc") is not None else None
            available = elem.find("available").text if elem.find(
                "available") is not None else None
            stock = elem.find("stock").text if elem.find(
                "stock") is not None else None
            stock = stock.replace(".", "")

            product = get_or_none(
                Product, root_reference=root_reference, reference=reference, provider="MAKITO")
            if len(product):
                product = product.first()
                if "immediately" in available:
                    None
                else:
                    arrival = datetime.strptime(
                        available,  "%d-%m-%Y")
                    product.available_from = arrival

                product.stock = stock
                product.save()

        """ UPDATE PROVIDER """
        self.makito_settings.last_imported = timezone.now()
        self.makito_settings.type = ["Stock"]
        self.makito_settings.save()

        print("\n\n ======== >>>> Finished <<<<  ========")

    def update_prices(self):
        response = http.request('GET', self.prices)
        tree = etree.parse(BytesIO(response.data))
        root = tree.getroot()

        print("\n ======== >>>> Updating MAKITO PRICES executed <<<<  ========")

        for i, elem in enumerate(root):
            progress(i, len(root)-1)
            root_reference = elem.find("ref").text if elem.find(
                "ref") is not None else None
            price1 = elem.find("price1").text if elem.find(
                "price1") is not None else None
            products = get_or_none(Product,
                                   root_reference=root_reference, provider="MAKITO")
            if len(products):
                for product in products:
                    product.price = float(price1) * 2
                    product.save()

        print("\n\n ======== >>>> Finished <<<<  ========")

    def add_arguments(self, parser):
        parser.add_argument('-p', '--products', action="store_true",
                            help='Import Makito Productos')
        parser.add_argument('-s', '--stock', action="store_true",
                            help='Import Makito Stock')
        parser.add_argument('-e', '--prices', action="store_true",
                            help='Update Makito Precios')
        parser.add_argument('-t', '--techniques', action="store_true",
                            help='Import Makito Tecnicas')
        parser.add_argument('-i', '--images', action="store_true",
                            help='Download images from products')

    def handle(self, *args, **options):
        download_images = options['images']
        import_products = options['products']
        import_printing = options["techniques"]
        update_stock = options["stock"]
        update_prices = options['prices']

        if not self.makito_settings.is_active:
            sys.exit("Import makito is not activated")

        if import_products:
            self.import_products(download_images)
        if update_stock:
            self.update_stock()
        if update_prices:
            self.update_prices()
        if import_printing:
            self.import_engrave_technics()
