## Programatically import Product data (products, prices, stock, images, engrave areas, engrave techniques)

Descarga, guarda, crea, actualiza todos los datos de los productos.

**Nota**: Al importar los productos, lás imágenes son tratadas, redimensionadas
a 1000x1000 con una calidad del 50% del original. Se añade un marco blanco y se
centra la imagen original dentro del marco, así todas las imágenes luciran
igual.

### Commandos

1. import_makito
2. import-
3. import-

## Importar Makito

Importar Makito, productos, precios, stock, imágenes, ténicas de gravado y
áreas.

#### Párametros

| Opción | Description                                                                               |
| ------ | ----------------------------------------------------------------------------------------- |
| -p     | Importa los productos                                                                     |
| -s     | Actualiza el stock de los productos existentes                                            |
| -e     | Actualiza los precios de los productos                                                    |
| -t     | Importa las técnicas de gravado y áreas para los productos existentes en la base de datos |

##### (-p) Importar productos:

```sh
python .\manage.py import_makito -p
```

Importa los productos y crea lo que no existan, actualiza los existentes ante
cambios y descarga las imágenes _thumbnail_ y hasta 4 imágenes del producto.

##### (-s) Actualizar stock:

```sh
python .\manage.py import_makito -s
```

Actualiza el stock de los productos existentes en la base de datos. Programada
para ejecutarse cada 2 horas.

##### (-e) Actualizar precios:

```sh
python .\manage.py import_makito -e
```

Actualiza los precios de los productos existentes en la base de datos.

##### (-t) Importar técnicas y áreas:

```sh
python .\manage.py import_makito -t
```

Importa las técnicas y áreas de los productos existentes en la base de datos, y
actualiza los existentes.
