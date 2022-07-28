
## REST APIs - Product

1. Product List
2. Create Product
3. Update Product
4. Delete Product

#### Server URL or Base URL
`http://127.0.0.1:8002/`


####  1. Product List
##### HTTP Request
`[GET] /api/v1/ecommerce/product/`

##### Content-type
`'application/json'`

##### Success Status Code
`200`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Sample Response
```json
{
	"count": 2,
	"next": null,
	"previous": null,
	"results": [
		{
			"category": {
				"category_name": "PROTECCIÓN HIGIÉNICA",
				"slug": "proteccion-higienica"
			},
			"color": {
				"color_name": "AMARILLO",
				"slug": "amarillo"
			},
			"size": {
				"size_name": "S/T",
				"slug": "st"
			},
			"product_name": "test product 1",
			"slug": "test-product-1",
			"product_description": "test description",
			"product_description_additional": "",
			"product_image": "/media/images/product/test-product-1/product-01.JPG",
			"product_image_url": "",
			"product_thumbnail_image": null,
			"provider": "",
			"repeated_position": 0,
			"price": null,
			"net_price": null,
			"stock": 0,
			"accept_order_when_out_of_stock": false,
			"max_reserve_quantity": 50,
			"available_from": "2022-01-12T19:00:49.977062Z",
			"reference": "",
			"root_reference": "",
			"show_color_to_order": false,
			"weight": "0.00",
			"depth": "0.00",
			"width": "0.00",
			"height": "0.00",
			"combined_measured": "",
			"box_units": "0.00",
			"sell_per_box": false,
			"minimum_order": 1,
			"pallet_box": "0.00",
			"box_gross_weight": "0.00",
			"box_net_weight": "0.00",
			"box_dimension": "0.00",
			"material": "",
			"total_visit": 0,
			"is_published": true,
			"is_featured": false,
			"link_360": "",
			"link_video1": "",
			"link_video2": "",
			"outlet": false,
			"is_new": true,
			"is_most_sold": false,
			"liquidation": true,
			"settlement_position": "LEFT_UP",
			"liquidation_text": "",
			"liquidation_background_color": "",
			"liquidation_text_color": "",
			"is_seal_activated": false,
			"is_discount_allowed": false,
			"protect_import": false,
			"protect_image": false,
			"datasheet": null,
			"imported_json_data": [],
			"created_at": "2022-01-12T19:00:49.977233Z",
			"updated_at": "2022-01-12T19:00:49.977249Z"
		}
	]
}
```

####  2. Create Product 

##### HTTP Request
`[POST] /api/v1/ecommerce/product/create/`

##### Multipart Form
`'multipart-form'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`201`

##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
category | required, category-slug | 
color | required, color-slug | 
size | required, size-slug | 
product_name | required, min:3, max:250 | 

##### Sample Request
Field | value 
--------- | ------- 
category | proteccion-higienica 
color | amarillo 
size | st 
product_name | test product 1
product_description | test description
product_description_additional | 
product_image | (IMG) product1.jpg
product_image_url | 
provider | 
repeated_position | 
price | 
net_price | 
stock |
accept_order_when_out_of_stock | 
max_reserve_quantity | 
available_from |
reference |
root_reference | 
show_color_to_order | 
weight | 
depth | 
width | 
height | 
combined_measured |
box_units | 
sell_per_box | 
minimum_order | 
pallet_box | 
box_gross_weight | 
box_net_weight |
box_dimension | 
material | 
is_published | true
is_featured | false
link_360 | 
link_video1 |
link_video2 | 
outlet | 
is_new | 
is_most_sold | 
liquidation | 
settlement_position | 
liquidation_text | 
liquidation_background_color | 
liquidation_text_color | 
is_seal_activated | 
is_discount_allowed | 
protect_import | 
protect_image | 
datasheet | 
imported_json_data | []
product_image[0] | (IMG)
product_image[1] | (IMG)
product_image[2] | (IMG)
product_image[3] | (IMG)


##### Sample Response
```json
{
	"category": {
		"category_name": "PROTECCIÓN HIGIÉNICA",
		"slug": "proteccion-higienica"
	},
	"color": {
		"color_name": "AMARILLO",
		"slug": "amarillo"
	},
	"size": {
		"size_name": "S/T",
		"slug": "st"
	},
	"product_name": "test product 1",
	"slug": "test-product-1-7",
	"product_description": "test description",
	"product_description_additional": "",
	"product_image": "/media/images/product/test-product-1-7/product-01.JPG",
	"product_image_url": "",
	"product_thumbnail_image": null,
	"provider": "",
	"repeated_position": 0,
	"price": null,
	"net_price": null,
	"stock": 0,
	"accept_order_when_out_of_stock": false,
	"max_reserve_quantity": 50,
	"available_from": "2022-01-29T04:09:33.903953Z",
	"reference": "",
	"root_reference": "",
	"show_color_to_order": false,
	"weight": "0.00",
	"depth": "0.00",
	"width": "0.00",
	"height": "0.00",
	"combined_measured": "",
	"box_units": "0.00",
	"sell_per_box": false,
	"minimum_order": 1,
	"pallet_box": "0.00",
	"box_gross_weight": "0.00",
	"box_net_weight": "0.00",
	"box_dimension": "0.00",
	"material": "",
	"total_visit": 0,
	"is_published": true,
	"is_featured": false,
	"link_360": "",
	"link_video1": "",
	"link_video2": "",
	"outlet": false,
	"is_new": true,
	"is_most_sold": false,
	"liquidation": true,
	"settlement_position": "LEFT_UP",
	"liquidation_text": "",
	"liquidation_background_color": "",
	"liquidation_text_color": "",
	"is_seal_activated": false,
	"is_discount_allowed": false,
	"protect_import": false,
	"protect_image": false,
	"datasheet": null,
	"imported_json_data": [],
	"created_at": "2022-01-29T04:09:33.904225Z",
	"updated_at": "2022-01-29T04:09:33.904262Z"
}
```


####  3. Update Product 

##### HTTP Request
`[PUT] /api/v1/ecommerce/product/{product-slug}/update/`

##### Content-type
`'application/json'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`200`


##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
category | required, category-slug | 
color | required, color-slug | 
size | required, size-slug | 
product_name | required, min:3, max:250 | 

##### Sample Request
Field | value 
--------- | ------- 
category | proteccion-higienica 
color | amarillo 
size | st 
product_name | test product 1
product_description | test description
product_description_additional | 
product_image | (IMG) product1.jpg
product_image_url | 
provider | 
repeated_position | 
price | 
net_price | 
stock |
accept_order_when_out_of_stock | 
max_reserve_quantity | 
available_from |
reference |
root_reference | 
show_color_to_order | 
weight | 
depth | 
width | 
height | 
combined_measured |
box_units | 
sell_per_box | 
minimum_order | 
pallet_box | 
box_gross_weight | 
box_net_weight |
box_dimension | 
material | 
is_published | true
is_featured | false
link_360 | 
link_video1 |
link_video2 | 
outlet | 
is_new | 
is_most_sold | 
liquidation | 
settlement_position | 
liquidation_text | 
liquidation_background_color | 
liquidation_text_color | 
is_seal_activated | 
is_discount_allowed | 
protect_import | 
protect_image | 
datasheet | 
imported_json_data | []
product_image[0] | (IMG)
product_image[1] | (IMG)
product_image[2] | (IMG)
product_image[3] | (IMG)


##### Sample Response
```json
{
	"category": {
		"category_name": "PROTECCIÓN HIGIÉNICA",
		"slug": "proteccion-higienica"
	},
	"color": {
		"color_name": "AMARILLO",
		"slug": "amarillo"
	},
	"size": {
		"size_name": "S/T",
		"slug": "st"
	},
	"product_name": "test product 1",
	"slug": "test-product-1-7",
	"product_description": "test description",
	"product_description_additional": "",
	"product_image": "/media/images/product/test-product-1-7/product-01.JPG",
	"product_image_url": "",
	"product_thumbnail_image": null,
	"provider": "",
	"repeated_position": 0,
	"price": null,
	"net_price": null,
	"stock": 0,
	"accept_order_when_out_of_stock": false,
	"max_reserve_quantity": 50,
	"available_from": "2022-01-29T04:09:33.903953Z",
	"reference": "",
	"root_reference": "",
	"show_color_to_order": false,
	"weight": "0.00",
	"depth": "0.00",
	"width": "0.00",
	"height": "0.00",
	"combined_measured": "",
	"box_units": "0.00",
	"sell_per_box": false,
	"minimum_order": 1,
	"pallet_box": "0.00",
	"box_gross_weight": "0.00",
	"box_net_weight": "0.00",
	"box_dimension": "0.00",
	"material": "",
	"total_visit": 0,
	"is_published": true,
	"is_featured": false,
	"link_360": "",
	"link_video1": "",
	"link_video2": "",
	"outlet": false,
	"is_new": true,
	"is_most_sold": false,
	"liquidation": true,
	"settlement_position": "LEFT_UP",
	"liquidation_text": "",
	"liquidation_background_color": "",
	"liquidation_text_color": "",
	"is_seal_activated": false,
	"is_discount_allowed": false,
	"protect_import": false,
	"protect_image": false,
	"datasheet": null,
	"imported_json_data": [],
	"created_at": "2022-01-29T04:09:33.904225Z",
	"updated_at": "2022-01-29T04:09:33.904262Z"
}
```


####  4. Delete Product
##### HTTP Request
`[DELETE] /api/v1/ecommerce/product/{product-slug}/delete`

##### Content-type
`'application/json'`

##### Success Status Code
`204`

##### HTTP Headers
`Authorization : Bearer --access-token--`
