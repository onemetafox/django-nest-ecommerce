# PubliExpe - Backend

Django + Django REST Framework based ecommerce application.

## Features

1. Authentication & AUthorization.
2. Manage user profile & credentials.
3. Browse products based on category and search filters.
4. Make orders and payments
5. Import product information from remote sources.
6. Blog functionalities

## Tech stack

1. Python 3.8
2. Django 3.2 LTS
3. Django REST Framework 3.13

## Installation

Clone git repo

```sh
$ mkdir publiexpe-backend && cd $_
$ git clone https://github.com/3rChuss/PUBLIEXPE_NEW.git .
```

Install virtualenv & activate virtual environment

```sh
$ virtualenv venv
$ source venv/bin/activate
```

_Windows_

```sh
.\venv\Scripts\activate
```

Install Django & required packages

```sh
(venv) $ pip install -r requirements.txt
```

Install PIP packages (Not required if you have installed requirements using
previous command)

```sh
(venv) $ pip install django==3.2
(venv) $ pip install djangorestframework django-filter
(venv) $ pip install Pillow
(venv) $ pip install djangorestframework-simplejwt
(venv) $ pip install django-cors-headers
(venv) $ pip install -U "celery[redis]"
(venv) $ pip install django-celery-beat
(venv) $ pip install django-celery-results
(venv) $ pip install python-dotenv
```

Create .env file and update environment variables

```sh
(venv) $ sudo cp .env.sample .env
(venv) $ sudo nano .env

# secret key
SECRET_KEY=

# allowed host
ALLOWED_HOSTS='0.0.0.0 127.0.0.1'

# database
DATABASE=sqlite3
DATABASE_ENGINE=django.db.backends.sqlite3
DATABASE_NAME=db.sqlite3
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_URL=
```

Migrate models & create superuser

```sh
(venv) $ python manage.py makemigrations
(venv) $ python manage.py migrate
(venv) $ python manage.py createsuperuser
```

Load fixtures - Color, Size, Category, Product, Company

```sh
(venv) $ python manage.py loaddata ecommerce/fixtures/color.json --app Color
(venv) $ python manage.py loaddata ecommerce/fixtures/size.json --app Size
(venv) $ python manage.py loaddata ecommerce/fixtures/category.json --app Category
(venv) $ python manage.py loaddata ecommerce/fixtures/product.json --app Product
(venv) $ python manage.py loaddata dashboard/fixtures/company_settings.json --app Company
```

Run dev server in port 8002

```sh
(venv) $ python manage.py runserver 8002
```

Make sure server running in port 8002 using below url in browser

```sh
http://127.0.0.1:8002  (or)  http://yourip:8002
```

For admin access use below url in browser

```sh
http://127.0.0.1:8002/admin/  (or)  http://yourip:8002/admin
```

### REST APIs Documentation

1. [Auth (or) Authentication](api-doc/readme-auth.md)
2. [Color](api-doc/readme-color.md)
3. [Size](api-doc/readme-size.md)
4. [Category](api-doc/readme-category.md)
