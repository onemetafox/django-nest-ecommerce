## REST APIs - Dashboard

1. Company settings
2. Data protection
3. Shippings

#### Server URL or Base URL

`http://127.0.0.1:8002/`

#### 1. Company settings

##### HTTP Request

`[GET] /api/v1/ecommerce/admin/company/`

##### Content-type

`'application/json'`

##### Success Status Code

`200`

##### HTTP Headers

`Authorization : Bearer --access-token--`

##### Sample Response

```json
{
	"id": 1,
	"company_name": "Publiexpe Gestión Integral De Publicidad S.L",
	"cif": "B18946194",
	"address": "P.I. IZNAMONTES, C/ DEIFONTES",
	"address_extra": "PARCELAS 32, 33 y 34",
	"locality": "IZNALLOZ",
	"city": "Granada, España",
	"postal_code": 18550,
	"phone_number": 958166322,
	"slug": null,
	"tariff_global": 5.0,
	"tariff_engraving": 0.0,
	"vat": null,
	"vat_show_in_products": false,
	"vat_prefix": null,
	"shipping_measure_unit": null,
	"shipping_dimension_unit": null,
	"shipping_calculate_in_cart": false,
	"shipping_to": "SHIPPING_ADDRESS",
	"product_active_review": false,
	"product_active_rating": false,
	"stock_active_management": false,
	"stock_low_threshold": 0,
	"stock_high_threshold": 0,
	"stock_out_hidde_product": false,
	"cart_active": false,
	"cuppons_active": true
}
```

##### Update / Create

##### HTTP Request

`[POST] /api/v1/ecommerce/admin/company/create/` Updates the current company if
exists, if not, it creates a new company settings, limited to only 1 record.

#### 2. Data Protection

##### HTTP Request

`[GET] /api/v1/ecommerce/admin/gdrp/`

##### Content-type

`'application/json'`

##### HTTP Headers

`Authorization : Bearer --access-token--`

##### Success Status Code

`200`

##### Sample Request

```json

```

##### Sample Response

```json
{
	"id": 1,
	"version": 1.2,
	"display_text": "html...",
	"legal_advice": "html...",
	"privacy_policy": "html...",
	"cookies_web": "html...",
	"terms_and_conditions": "html...",
	"updated_at": "2022-02-18T12:24:11.419025Z"
}
```

##### Update / Create

`[POST] /api/v1/ecommerce/admin/gdrp/update`

##### Query Parameters

| Field                | Validation     | Description                                            |
| -------------------- | -------------- | ------------------------------------------------------ |
| id                   | if exists      |                                                        |
| version              | float number   | Version num of the privacy                             |
| display_text         | html, no limit | Html text/code to display in the cookies banner        |
| legal_advice         | html, no limit | Html text/code to display in Legal advice page         |
| privacy_policy       | html, no limit | Html text/code to display in Privacy policy page       |
| cookies_web          | html, no limit | Html text/code to display in Cookies policy page       |
| terms_and_conditions | html, no limit | Html text/code to display in Terms and conditions page |

#### 3. Shippings

##### HTTP Request

`[GET] /api/v1/ecommerce/admin/shippings/`

##### Content-type

`'application/json'`

##### HTTP Headers

`Authorization : Bearer --access-token--`

##### Success Status Code

`200`

##### Sample Response

```json
{
	"id": 29,
	"slug": "andalucia",
	"zone_name": "Andalucia",
	"regions": ["España"],
	"shippings_methods": [
		{
			"id": 24,
			"slug": "envio-gratis-1",
			"name": "Envío gratis",
			"is_active": true,
			"description": "El envío gratis puede obtenerse por cupones o un mínimo precio en el carrito.",
			"price": 250.0,
			"type": "FREE", <FREE , FLAT, CUSTOM>
			"requirement": "MIN_AMOUNT" <MIN_AMOUNT, COUPON, EITHER>
		},
		{
			"id": 25,
			"slug": "precio-fijo",
			"name": "Precio fijo",
			"is_active": true,
			"description": "Le permite cobrar una tarifa fija por el envío.",
			"price": 12.5,
			"type": "FLAT",  <FREE , FLAT, CUSTOM>
			"requirement": null
		}
	]
}
```

A non null **requirement** will apply some validations such as: _MIN_AMOUNT_
(price > 0) | _COUPON_ (coupon exists and not expired)

##### Create

`[POST] /api/v1/ecommerce/admin/shippings/create`

##### Query Parameters

| Field             | Validation                                          | Description                            |
| ----------------- | --------------------------------------------------- | -------------------------------------- |
| zone_name         | max length = 20, non nullable                       | Zone name                              |
| regions           | Array of strings, max length = 50, Array size = 100 | Array of regions ["España", "France"]  |
| shippings methods | Array of shipping methods                           | Shipping Methods allowed for that zone |

##### Sample request

```json
{
	"zone_name": "España",
	"regions": ["España", "Francia"],
	"shippings_methods": [
		{
			"type": "FREE",
			"name": "Envío gratis",
			"description": "El envío gratis puede obtenerse por cupones o un mínimo precio en el carrito.",
			"is_active": true,
			"requirement": "MIN_AMOUNT",
			"price": "50"
		}
	]
}
```

##### Create

`[PUT] /api/v1/ecommerce/admin/shippings/{slug}/update/`

##### Content-type

`'application/json'`

##### HTTP Headers

`Authorization : Bearer --access-token--`

##### Success Status Code

`201`

##### Query Parameters

| Field             | Validation                                          | Description                            |
| ----------------- | --------------------------------------------------- | -------------------------------------- |
| zone_name         | max length = 20, non nullable                       | Zone name                              |
| regions           | Array of strings, max length = 50, Array size = 100 | Array of regions ["España", "France"]  |
| shippings methods | Array of shipping methods                           | Shipping Methods allowed for that zone |

##### Sample request

```json
{
	"zone_name": "España",
	"regions": ["España", "Francia"],
	"shippings_methods": [
		{
			"type": "FREE",
			"name": "Envío gratis",
			"description": "El envío gratis puede obtenerse por cupones o un mínimo precio en el carrito.",
			"is_active": false,
			"requirement": "MIN_AMOUNT",
			"price": "12.5"
		}
	]
}
```

##### Sample response

```json
{
	"zone_name": "España",
	"regions": ["España", "Francia"],
	"shippings_methods": [
		{
			"type": "FREE",
			"name": "Envío gratis",
			"description": "El envío gratis puede obtenerse por cupones o un mínimo precio en el carrito.",
			"is_active": false,
			"requirement": "MIN_AMOUNT",
			"price": "12.5"
		}
	]
}
```

#### Delete

##### HTTP Request

`[DELETE] /api/v1/ecommerce/admin/shippings/{slug}/update/`

##### Content-type

`'application/json'`

##### Success Status Code

`204`

##### HTTP Headers

`Authorization : Bearer --access-token--`
