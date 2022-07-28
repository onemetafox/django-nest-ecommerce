__copyright__ = 'Copyright 2022, Jesus Abril'
import urllib3
import shutil
import os
import sys

from os.path import exists
from lxml import etree
from io import BytesIO
from datetime import datetime

from django.utils import timezone
from django.core.management.base import BaseCommand
from django.template.defaultfilters import slugify
from django.conf import settings

# Models
from ecommerce.models import Category, Product, Color, Size, EngravingTechnique, EngravingArea, ProductVariant, ProductSeo
from ecommerce.serializers import CategorySerializer, ProductSerializer, ColorSerializer, SizeSerializer
from dashboard.models import Provider
from general.models import MediaGallery

# Constant
http = urllib3.PoolManager()


def get_or_none(model, *args, **kwargs):
    try:
        return model.objects.filter(*args, **kwargs)
    except model.DoesNotExist:
        return None


def get_product_image_upload_path(slug, filename):
    """Product image upload directory path"""
    return 'images/product/makito/{0}/{1}'.format(slug, filename)


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

    try:
        makito_settings = Provider.objects.get(slug="makito")
    except Provider.DoesNotExist:
        makito_settings = None

    parser = etree.XMLParser(remove_blank_text=True)
    test_product = "https://acmemkt.com/wp-content/uploads/2022/makito.xml"
    products = "http://print.makito.es:8080/user/xml/ItemDataFile.php?pszinternal=00014583259298920141216033&ldl=esp"
    stock = "http://print.makito.es:8080/user/xml/allstockfile.php?pszinternal=00014583259298920141216033"
    prices = "http://print.makito.es:8080/user/xml/PriceListFile.php?pszinternal=00014583259298920141216033"
    engrave_tecnics = "http://print.makito.es:8080/user/xml/ItemPrintingFile.php?pszinternal=00014583259298920141216033&ldl=esp"
    engrave_prices = "http://print.makito.es:8080/user/xml/PrintJobsPrices.php?pszinternal=00014583259298920141216033&ldl=esp"

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
                "name") is not None else None
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
            box_dimension = ((masterbox_long or " ") + "x" +
                             (masterbox_hight or " ") + "x" + (masterbox_width or " "))
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

                main_category_ref = categories.find("category_ref_1").text
                main_category_name = categories.find("category_name_1").text
                category_id = "<" + main_category_ref + \
                    ">" if main_category_ref is not None else None

                if category_id is not None:
                    category_name = main_category_name.replace(
                        "\n", "").lower().capitalize()
                    self.category_tree += category_id + ","
                    slug = slugify(main_category_name)
                    category = get_or_none(
                        Category, slug=slug)

                    # First create category
                    if len(category) == 0:
                        new_category = {
                            "category_name": category_name, "is_active": True, "show_in_menu_list": False, "is_favorite": False, "makito_id":  self.category_tree}
                        serializer = self.category_serializer(
                            Category(), data=new_category)
                        serializer.is_valid(raise_exception=True)
                        category = serializer.save()
                        new_product["category"] = category
                    else:
                        category = Category.objects.get(
                            slug=category.first().slug)
                        new_product["category"] = category
                else:
                    always_cat, _ = Category.objects.get_or_create(
                        slug="nuevo", category_name="Nuevo")
                    new_product["category"] = always_cat

                # Subcategories
                for i, cat in enumerate(categories, start=2):
                    category_name = categories.find("category_name_"+str(i)).text if categories.find(
                        "category_name_"+str(i)) is not None else None
                    category_id = categories.find("category_ref_"+str(i)).text if categories.find(
                        "category_ref_"+str(i)) is not None else None

                    category_id = "<" + category_id + ">" if category_id is not None else None

                    # Check if subcategory already exists
                    if category_id is not None and category_name is not None:
                        category_name = category_name.replace(
                            "\n", "").lower().capitalize()
                        self.category_tree += category_id + ","
                        slug = slugify(category_name)
                        category = get_or_none(
                            Category, slug=slug)
                        # First create subcategory
                        if len(category) == 0:
                            new_category = {
                                "category_name": category_name, "is_active": True, "show_in_menu_list": False, "is_favorite": False, "makito_id":  self.category_tree}
                            serializer = self.category_serializer(
                                Category(), data=new_category)
                            serializer.is_valid(raise_exception=True)
                            category = serializer.save()
                            sub_categories.append(category)
                        else:
                            try:
                                category = Category.objects.get(
                                    slug=slug)
                            except Category.DoesNotExist:
                                category = Category.objects.get(
                                    slug=category.first().slug)

                            sub_categories.append(category)

            """ MAIN IMAGE """
            imagemain = elem.find("imagemain").text if elem.find(
                "imagemain") is not None else None
            if imagemain is not None:
                filename = imagemain.split("/")[-1]
                product_image_url = get_product_thumbnail_upload_path(
                    filename)
                image = get_or_none(MediaGallery, file=product_image_url)
                if len(image) == 0:
                    os.umask(0)
                    image_dir = os.path.join(
                        settings.MEDIA_ROOT, "images/product/makito/thumbnail/")
                    if not os.path.exists(image_dir):
                        os.makedirs(image_dir, mode=777)
                    else:
                        with http.request('GET', imagemain, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                            shutil.copyfileobj(r, out_file)
                new_product["thumbnail"] = product_image_url
                new_product["product_image_url"] = imagemain

            else:
                images = elem.find("images")
                if images is not None:
                    for image in images:
                        main_image = image.find("main").text if image.find(
                            "main") is not None else None
                        if main_image is not None and main_image == "true":
                            product_image = image.find("imagemax").text if image.find(
                                "imagemax") is not None else None
                            if product_image is not None:
                                filename = product_image.split("/")[-1]
                                product_image_url = get_product_thumbnail_upload_path(
                                    filename)
                                media_image = get_or_none(
                                    MediaGallery, file=product_image_url)
                                if len(media_image) == 0:
                                    os.umask(0)
                                    image_dir = os.path.join(
                                        settings.MEDIA_ROOT, "images/product/makito/thumbnail/")
                                    if not os.path.exists(image_dir):
                                        os.makedirs(image_dir, mode=777)
                                    else:
                                        with http.request('GET', product_image, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                            shutil.copyfileobj(r, out_file)

                                new_product["thumbnail"] = product_image_url
                            new_product["product_image_url"] = product_image

            """             """
            """ NEW PRODUCT """
            """             """
            product = get_or_none(
                Product, root_reference=root_reference, provider="MAKITO")
            if len(product) == 0:
                new_product["product_name"] = product_name
                new_product["product_description"] = product_description
                new_product["product_description_additional"] = product_description_additional or ""
                new_product["sub_category"] = sub_categories or None
                new_product["root_reference"] = root_reference
                new_product["provider"] = provider
                new_product["material"] = material or ""
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
                new_product["link_360"] = link_360 or ""
                new_product["link_video1"] = link_video1 or ""
                new_product["tags"] = tags

                product = Product.objects.create(
                    category=new_product["category"],
                    product_name=new_product["product_name"],
                    product_description=new_product["product_description"],
                    product_description_additional=new_product["product_description_additional"],
                    product_image_url=new_product.get("product_image_url"),
                    root_reference=new_product["root_reference"],
                    provider=new_product["provider"],
                    material=new_product["material"],
                    weight=round(
                        float(str(new_product["weight"]).replace(",", ".")), 2),
                    depth=round(
                        float(str(new_product["depth"]).replace(",", ".")), 2),
                    width=round(
                        float(str(new_product["width"]).replace(",", ".")), 2),
                    height=round(
                        float(str(new_product["height"]).replace(",", ".")), 2),
                    box_units=new_product["box_units"],
                    box_weight=round(
                        float(str(new_product["box_weight"]).replace(",", ".")), 2),
                    box_dimension=new_product["box_dimension"],
                    minimum_order=new_product["minimum_order"],
                    pallet_box=new_product["pallet_box"],
                    pallet_units=new_product["pallet_units"],
                    pallet_weight=round(
                        float(str(new_product["pallet_weight"]).replace(",", ".")), 2),
                    link_360=new_product["link_360"],
                    link_video1=new_product["link_video1"],
                    tags=new_product["tags"],
                    is_published=True,
                    is_featured=True,
                    is_new=True,
                    rating=0
                )

                product.sub_category.set(sub_categories)
                product.save()

                print(
                    "------------------------- \n PRODUCTO NUEVO CREADO \n------------------------- ")
                print("=== REF: " + product.root_reference + " ===")

                # Save Images into Media Gallery
                if new_product.__contains__("thumbnail"):
                    new_image = MediaGallery.objects.filter(
                        file=new_product["thumbnail"])
                    if len(new_image) == 0:
                        new_image = MediaGallery.objects.create(product=product,
                                                                file=new_product["thumbnail"], alt=f"{new_product['product_name']}, personalizable de MAKITO - ref: {new_product['root_reference']}")
                        product.thumbnail = new_image.file
                        product.save()
                    else:
                        product.thumbnail = new_image.first().file
                        product.save()

                # Generate default SEO for the product
                seo = ProductSeo.objects.create(product=product)

            else:
                # Update product
                product = Product.objects.get(
                    root_reference=root_reference, provider=provider)
                product.root_reference = root_reference
                product.minimum_order = minimum_order or product.minimum_order
                product.link_360 = link_360 or product.link_360
                product.link_video1 = link_video1 or product.link_video1
                product.is_featured = False
                product.is_new = False

                product.save()

                # Generate default SEO if the current product does not have any.
                seo = get_or_none(ProductSeo, product=product)
                if len(seo) == 0:
                    seo = ProductSeo.objects.create(product=product)

            self.saved_products.append(root_reference)

            """ IMAGES ENVIORMENT """
            images = elem.find("images_environment")
            product_image = get_or_none(MediaGallery,
                                        product=product)
            if images is not None:
                for i, image in enumerate(images):
                    # Max 3 images for product
                    if not i >= 3 and len(product_image) < 3:
                        img = image.text if image is not None else None
                        if img is not None:
                            filename = img.split("/")[-1]
                            product_image_url = get_product_image_upload_path(product.slug,
                                                                              filename)
                            media_image = get_or_none(
                                MediaGallery, file=product_image_url)
                            if len(media_image) == 0:
                                os.umask(0)
                                image_dir = os.path.join(
                                    settings.MEDIA_ROOT, "images/product/makito/"+product.slug)
                                if not os.path.exists(image_dir):
                                    os.makedirs(image_dir, mode=777)
                                else:
                                    with http.request('GET', img, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                        shutil.copyfileobj(r, out_file)
                                        new_image = MediaGallery.objects.create(product=product,
                                                                                file=product_image_url, alt=f"{product.product_name}, personalizable de MAKITO - ref: {product.root_reference}")

            """ IMAGES """
            images = elem.find("images")
            if images is not None:
                for i, image in enumerate(images):
                    # Max 3 images for product
                    if not i >= 3 and len(product_image) < 3:
                        imagemax = image.find("imagemax").text if image.find(
                            "imagemax") is not None else None
                        main = image.find("main").text if image.find(
                            "main") is not None else False
                        main = True if main == "true" else False
                        if imagemax is not None:
                            filename = imagemax.split("/")[-1]
                            product_image_url = get_product_image_upload_path(product.slug,
                                                                              filename)
                            media_image = get_or_none(
                                MediaGallery, file=product_image_url)
                            if len(media_image) == 0:
                                os.umask(0)
                                image_dir = os.path.join(
                                    settings.MEDIA_ROOT, "images/product/makito/"+product.slug)
                                if not os.path.exists(image_dir):
                                    os.makedirs(image_dir, mode=777)
                                else:
                                    with http.request('GET', imagemax, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                        shutil.copyfileobj(r, out_file)
                                        new_image = MediaGallery.objects.create(product=product,
                                                                                file=product_image_url, alt=f"{product.product_name}, personalizable de MAKITO - ref: {product.root_reference}", main=main)

            """ VARIANTS """
            sub_categories = list(filter(None, sub_categories))
            variants = elem.find("variants")
            if variants is not None:
                for variant in variants:
                    new_variant = {}
                    refct = variant.find("refct").text if variant.find(
                        "refct") is not None else None
                    product_variant = get_or_none(
                        ProductVariant, reference=refct)
                    if len(product_variant) == 0:
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
                            new_variant["color"] = color
                        else:
                            color = Color.objects.get(slug=slug)
                            new_variant["color"] = color

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
                            new_variant["size"] = size
                        else:
                            size = Size.objects.get(slug=slug)
                            new_variant["size"] = size

                        """ MAIN IMAGE """
                        image500_url = variant.find("image500px").text if variant.find(
                            "image500px") is not None else None
                        if image500_url is not None:
                            filename = image500_url.split("/")[-1]
                            product_image_url = get_product_thumbnail_upload_path(
                                filename)
                            media_image = get_or_none(
                                MediaGallery, file=product_image_url)
                            if len(media_image) == 0:
                                os.umask(0)
                                image_dir = os.path.join(
                                    settings.MEDIA_ROOT, "images/product/makito/thumbnail/")
                                if not os.path.exists(image_dir):
                                    os.makedirs(image_dir, mode=777)
                                else:
                                    with http.request('GET', image500_url, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, product_image_url), 'wb') as out_file:
                                        out_file.write(r.data)

                            new_variant["image"] = product_image_url
                            new_variant["original_img_url"] = image500_url

                    """ NEW VARIANT """

                    if len(product_variant) == 0:
                        new_variant["reference"] = refct
                        new_variant["product_name"] = product.product_name + " - " + \
                            new_variant["color"].color_name + \
                            " - " + new_variant["size"].size_name

                        product_variant = ProductVariant.objects.create(
                            product=product,
                            color=new_variant["color"],
                            size=new_variant["size"],
                            variant_name=new_variant["product_name"],
                            original_img_url=new_variant["original_img_url"],
                            reference=new_variant["reference"]
                        )

                        product_variant.save()

                        if new_variant.__contains__("image"):
                            new_image = MediaGallery.objects.filter(
                                file=new_variant["image"])
                            if len(new_image) == 0:
                                new_image = MediaGallery.objects.create(product=product,
                                                                        file=new_variant["image"], alt=f"{product.product_name} color {product_variant.color.color_name}, personalizable de MAKITO - ref: {product_variant.reference}")
                                product_variant.image = new_image.file
                                product_variant.save()
                            else:
                                product_variant.image = new_image.first().file
                                product_variant.save()

                    else:
                        # Check for updates
                        product_variant = ProductVariant.objects.get(product=product,
                                                                     reference=refct)
                        product_variant.reference = refct
                        product_variant.save()

        products_to_delete = Product.objects.filter(provider="MAKITO")
        products_to_delete = products_to_delete.exclude(
            root_reference__in=self.saved_products)

        if len(products_to_delete):
            for product in products_to_delete:
                product.delete()

        """ RESIZE IMAGES """
        print("\n\n ======== >>>> Resizing Images <<<<  ========")
        os.system("python3 manage.py resize_images --provider makito")

        """ UPDATE PROVIDER """
        self.makito_settings.last_imported = timezone.now()
        self.makito_settings.type = ["Productos", "Imágenes"]
        self.makito_settings.save()

        print("\n\n ======== >>>> Finished <<<<  ========")

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
                        code_makito = teccode

                        engraving_technique = get_or_none(
                            EngravingTechnique, code_makito__icontains=code_makito)
                        if len(engraving_technique) == 0:
                            engraving_technique = EngravingTechnique.objects.create(
                                code_makito=code_makito, name=tecname, max_color=max_color)
                        else:
                            engraving_technique = engraving_technique.first()

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
                                    area_image_url = get_engraved_area_image_upload_path(
                                        filename)
                                    file_exists = exists(os.path.join(
                                        settings.MEDIA_ROOT, area_image_url))
                                    area_image_url_resized = get_engraved_area_image_upload_path(
                                        "r_"+filename)
                                    file_resized_exists = exists(os.path.join(
                                        settings.MEDIA_ROOT, area_image_url_resized))
                                    if not (file_exists or file_resized_exists):
                                        os.umask(0)
                                        image_dir = os.path.join(
                                            settings.MEDIA_ROOT, "images/product/makito/engraved-area/")
                                        if not os.path.exists(image_dir):
                                            os.makedirs(image_dir, mode=777)
                                        else:
                                            with http.request('GET', areaimg, preload_content=False) as r, open(os.path.join(settings.MEDIA_ROOT, area_image_url), 'wb') as out_file:
                                                out_file.write(r.data)
                                                saved_thumb_names.append(
                                                    filename)
                                        image = area_image_url
                                    else:
                                        image = area_image_url_resized

                                engraved_area = get_or_none(
                                    EngravingArea, code_makito__icontains=areacode, name=areaname)

                                if len(engraved_area) == 0:
                                    print("CREANDO NUEVA AREA")
                                    try:
                                        engraved_area = EngravingArea.objects.create(
                                            name=areaname, code_makito=areacode, width=areawidth, height=areahight)
                                        engraved_area.product.add(
                                            products.first())
                                        engraved_area.engraving_technique.add(
                                            engraving_technique)

                                        if image is not None:
                                            engraved_area.image = image

                                        engraved_area.save()
                                    except:
                                        continue
                                elif len(engraved_area) > 0:
                                    area = engraved_area.first()
                                    area.code_makito = areacode
                                    area.product.add(products.first())
                                    area.engraving_technique.add(
                                        engraving_technique)
                                    area.save()

                                self.saved_areas.append(engraved_area)

        """ RESIZE IMAGES """
        print("\n\n ======== >>>> Resizing Images <<<<  ========")
        os.system("python .\manage.py resize_images --tecnicas makito")

        """ UPDATE PROVIDER """
        self.makito_settings.last_imported = timezone.now()
        self.makito_settings.type = ["Técnicas", "Áreas"]
        self.makito_settings.save()

        print("\n\n ======== >>>> Finished <<<<  ========")

    def update_stock(self):
        response = http.request('GET', self.stock)
        tree = etree.parse(BytesIO(response.data))
        root = tree.getroot()

        print("\n ======== >>>> Updating MAKITO SOTCK executed <<<<  ========")

        for i, elem in enumerate(root):
            progress(i, len(root)-1)
            reference = elem.find("reftc").text if elem.find(
                "ref") is not None else None
            available = elem.find("available").text if elem.find(
                "available") is not None else None
            stock = elem.find("stock").text if elem.find(
                "stock") is not None else None
            stock = stock.replace(".", "")

            product = get_or_none(
                ProductVariant, reference=reference)
            if len(product):
                product = product.first()
                if "immediately" in available:
                    product.available_from = timezone.now()
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
            reference = elem.find("ref").text if elem.find(
                "ref") is not None else None
            price1 = elem.find("price1").text if elem.find(
                "price1") is not None else None
            products = get_or_none(Product,
                                   root_reference=reference, provider="MAKITO")
            if len(products):
                variants = get_or_none(
                    ProductVariant, product=products.first())
                if len(variants):
                    for variant in variants:
                        variant.price = float(price1) * 2
                        variant.save()

        """ UPDATE PROVIDER """
        self.makito_settings.last_imported = timezone.now()
        self.makito_settings.type = ["Precios"]
        self.makito_settings.save()

        print("\n\n ======== >>>> Finished <<<<  ========")

    def import_engrave_tecprices(self):
        response = http.request('GET', self.engrave_prices)
        tree = etree.parse(BytesIO(response.data))
        root = tree.getroot()

        print("\n ======== >>>> Updating MAKITO TÉCNICAS PRECIOS executed <<<<  ========")
        printjobs = root.find("printjobs")

        if printjobs is not None:
            for i, elem in enumerate(printjobs):

                if elem is not None:
                    teccode = elem.find("teccode").text if elem.find(
                        "teccode") is not None else None
                    if teccode is None:
                        continue

                    technique = get_or_none(
                        EngravingTechnique, code_makito="<"+teccode+">")
                    if len(technique):
                        technique = technique.first()
                        # If the technique is blocked by the user we skip it (no update)
                        if technique.block_import:
                            continue

                        min_amount = elem.find("minamount").text if elem.find(
                            "minamount") is not None else 0
                        cliche_price = elem.find("cliche").text if elem.find(
                            "cliche") is not None else 30
                        repeated_cliche_price = elem.find("clicherep").text if elem.find(
                            "clicherep") is not None else 15
                        minimum_work = elem.find("minjob").text if elem.find(
                            "minjob") is not None else 0
                        min_amount_1 = elem.find("amountunder1").text if elem.find(
                            "amountunder1") is not None else 0
                        color1_price = elem.find("price1").text if elem.find(
                            "price1") is not None else 0.00
                        color1_aditional = elem.find("priceaditionalcol1").text if elem.find(
                            "priceaditionalcol1") is not None else 0.00
                        cm_price_1 = elem.find("pricecm1").text if elem.find(
                            "pricecm1") is not None else 0.00

                        min_amount_2 = elem.find("amountunder2").text if elem.find(
                            "amountunder2") is not None else 0
                        color2_price = elem.find("price2").text if elem.find(
                            "price2") is not None else 0.00
                        color2_aditional = elem.find("priceaditionalcol2").text if elem.find(
                            "priceaditionalcol2") is not None else 0.00
                        cm_price_2 = elem.find("pricecm2").text if elem.find(
                            "pricecm2") is not None else 0.00

                        min_amount_3 = elem.find("amountunder3").text if elem.find(
                            "amountunder3") is not None else 0
                        color3_price = elem.find("price3").text if elem.find(
                            "price3") is not None else 0.00
                        color3_aditional = elem.find("priceaditionalcol3").text if elem.find(
                            "priceaditionalcol3") is not None else 0.00
                        cm_price_3 = elem.find("pricecm3").text if elem.find(
                            "priceaditionalcol2") is not None else 0.00

                        min_amount_4 = elem.find("amountunder4").text if elem.find(
                            "amountunder4") is not None else 0
                        color4_price = elem.find("price4").text if elem.find(
                            "price4") is not None else 0.00
                        color4_aditional = elem.find("priceaditionalcol4").text if elem.find(
                            "priceaditionalcol4") is not None else 0.00
                        cm_price_4 = elem.find("pricecm4").text if elem.find(
                            "pricecm4") is not None else 0.00

                        min_amount_5 = elem.find("amountunder5").text if elem.find(
                            "amountunder5") is not None else 0
                        color5_price = elem.find("price5").text if elem.find(
                            "price5") is not None else 0.00
                        color5_aditional = elem.find("priceaditionalcol5").text if elem.find(
                            "priceaditionalcol5") is not None else 0.00
                        cm_price_5 = elem.find("pricecm5").text if elem.find(
                            "pricecm5") is not None else 0.00

                        min_amount_6 = elem.find("amountunder6").text if elem.find(
                            "amountunder6") is not None else 0
                        color6_price = elem.find("price6").text if elem.find(
                            "price6") is not None else 0.00
                        color6_aditional = elem.find("priceaditionalcol6").text if elem.find(
                            "priceaditionalcol6") is not None else 0.00
                        cm_price_6 = elem.find("pricecm6").text if elem.find(
                            "pricecm6") is not None else 0.00

                        min_amount_7 = elem.find("amountunder7").text if elem.find(
                            "amountunder7") is not None else 0
                        color7_price = elem.find("price7").text if elem.find(
                            "price7") is not None else 0.00
                        color7_aditional = elem.find("priceaditionalcol7").text if elem.find(
                            "priceaditionalcol7") is not None else 0.00
                        cm_price_7 = elem.find("pricecm7").text if elem.find(
                            "pricecm7") is not None else 0.00

                        terms = elem.find("terms").text if elem.find(
                            "terms") is not None else ""

                        technique.terms = terms or ""
                        technique.min_amount = min_amount or 0
                        technique.cliche_price = cliche_price or 30.00
                        technique.repeated_cliche_price = repeated_cliche_price or 0.00
                        technique.minimum_work = minimum_work if int(
                            minimum_work) >= 30 else 30
                        technique.min_amount_1 = min_amount_1 or 0.00
                        technique.color1_price = color1_price or 0.00
                        technique.color1_aditional = color1_aditional or 0.00
                        technique.cm_price_1 = cm_price_1 or 0.00
                        technique.min_amount_2 = min_amount_2 or 0
                        technique.color2_price = color2_price or 0.00
                        technique.color2_aditional = color2_aditional or 0.00
                        technique.cm_price_2 = cm_price_2 or 0.00
                        technique.min_amount_3 = min_amount_3 or 0
                        technique.color3_price = color3_price or 0.00
                        technique.color3_aditional = color3_aditional or 0.00
                        technique.cm_price_3 = cm_price_3 or 0.00
                        technique.min_amount_4 = min_amount_4 or 0
                        technique.color4_price = color4_price or 0.00
                        technique.color4_aditional = color4_aditional or 0.00
                        technique.cm_price_4 = cm_price_4 or 0.00
                        technique.min_amount_5 = min_amount_5 or 0
                        technique.color5_price = color5_price or 0.00
                        technique.color5_aditional = color5_aditional or 0.00
                        technique.cm_price_5 = cm_price_5 or 0.00
                        technique.min_amount_6 = min_amount_6 or 0
                        technique.color6_price = color6_price or 0.00
                        technique.color6_aditional = color6_aditional or 0.00
                        technique.cm_price_6 = cm_price_6 or 0.00
                        technique.min_amount_7 = min_amount_7 or 0
                        technique.color7_price = color7_price or 0.00
                        technique.color7_aditional = color7_aditional
                        technique.cm_price_7 = cm_price_7 or 0.00

                        technique.save()
                    else:
                        continue

        """ UPDATE PROVIDER """
        self.makito_settings.last_imported = timezone.now()
        self.makito_settings.type = ["Precios de las técnicas"]
        self.makito_settings.save()

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
        parser.add_argument('-ti', '--tecprices', action="store_true",
                            help='Importa los precios de las técnicas')

    def handle(self, *args, **options):
        download_images = options['images']
        import_products = options['products']
        import_printing = options["techniques"]
        update_stock = options["stock"]
        update_prices = options['prices']
        import_tecprices = options['tecprices']

        if self.makito_settings is None:
            sys.exit("El proveedor no existe")
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
        if import_tecprices:
            self.import_engrave_tecprices()
