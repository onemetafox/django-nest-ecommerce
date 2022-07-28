
## REST APIs - Category

1. Category List
2. Create Category
3. Update Category
4. Delete Category

#### Server URL or Base URL
`http://127.0.0.1:8002/`


####  1. Category List
##### HTTP Request
`[GET] /api/v1/ecommerce/category/`

##### Content-type
`'application/json'`

##### Success Status Code
`200`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Sample Response
```json
{
	"count": 158,
	"next": "http://127.0.0.1:8002/api/v1/ecommerce/category/?page=2",
	"previous": null,
	"results": [
		{
			"category_name": "ACCESORIOS Y COMPLEMENTOS",
			"slug": "accesorios-y-complementos",
			"parent_category": {
				"category_name": "GORRAS Y SOMBREROS",
				"slug": "gorras-y-sombreros"
			},
			"is_active": true,
			"show_in_menu_list": true,
			"is_favorite": false,
			"makito_id": null,
			"pfconcept_id": null,
			"sticker_id": null,
			"pfconcept_name": null,
			"cifra_name": null,
			"rolly_name": null,
			"jhk_name": null,
			"created_at": "2022-01-12T12:53:36.761933Z",
			"updated_at": "2022-01-12T12:53:36.761968Z"
		},
		{
			"category_name": "ALTA VISIBILIDAD",
			"slug": "alta-visibilidad",
			"parent_category": {
				"category_name": "TEXTIL",
				"slug": "textil"
			},
			"is_active": true,
			"show_in_menu_list": true,
			"is_favorite": false,
			"makito_id": null,
			"pfconcept_id": null,
			"sticker_id": null,
			"pfconcept_name": null,
			"cifra_name": null,
			"rolly_name": "<ALTA VISIBILIDAD>",
			"jhk_name": null,
			"created_at": "2022-01-12T13:33:08.789109Z",
			"updated_at": "2022-01-12T13:33:08.789140Z"
		},
		{
			"category_name": "ARTÍCULOS PARA BEBIDA",
			"slug": "articulos-para-bebida",
			"parent_category": null,
			"is_active": true,
			"show_in_menu_list": true,
			"is_favorite": false,
			"makito_id": "<31>,<34>",
			"pfconcept_id": "<mc4>",
			"sticker_id": null,
			"pfconcept_name": null,
			"cifra_name": null,
			"rolly_name": null,
			"jhk_name": null,
			"created_at": "2022-01-09T20:40:39.838305Z",
			"updated_at": "2022-01-09T20:40:39.838335Z"
		}
	]
}
```

####  2. Create Category 

##### HTTP Request
`[POST] /api/v1/ecommerce/category/create/`

##### Content-type
`'application/json'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`201`

##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
category_name | required, min_length: 3, max_length:250 | 



##### Sample Request
```json
{
	"category_name": "TEST-CATEGORY",
	"parent_category": null,
	"is_active": true,
	"show_in_menu_list": true,
	"is_favorite": false,
	"makito_id": null,
	"sticker_id": null,
	"pfconcept_id": null,
	"pfconcept_name": null,
	"cifra_name": null,
	"rolly_name": null,
	"jhk_name": null
}
```

##### Sample Response
```json
{
	"category_name": "TEST-CATEGORY",
	"slug": "test-category-3",
	"parent_category": null,
	"is_active": true,
	"show_in_menu_list": true,
	"is_favorite": false,
	"makito_id": null,
	"pfconcept_id": null,
	"sticker_id": null,
	"pfconcept_name": null,
	"cifra_name": null,
	"rolly_name": null,
	"jhk_name": null,
	"created_at": "2022-01-29T03:54:35.882844Z",
	"updated_at": "2022-01-29T03:54:35.882881Z"
}
```


####  3. Update Category 

##### HTTP Request
`[PUT] /api/v1/ecommerce/category/{category-slug}/update/`

##### Content-type
`'application/json'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`200`

##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
category_name | required, min_length: 3, max_length:250 | 



##### Sample Request
```json
{
	"category_name": "TEST-CATEGORY",
	"parent_category": null,
	"is_active": true,
	"show_in_menu_list": true,
	"is_favorite": false,
	"makito_id": null,
	"sticker_id": null,
	"pfconcept_id": null,
	"pfconcept_name": null,
	"cifra_name": null,
	"rolly_name": null,
	"jhk_name": null
}
```

##### Sample Response
```json
{
	"category_name": "TEST-CATEGORY",
	"slug": "test-category-3",
	"parent_category": null,
	"is_active": true,
	"show_in_menu_list": true,
	"is_favorite": false,
	"makito_id": null,
	"pfconcept_id": null,
	"sticker_id": null,
	"pfconcept_name": null,
	"cifra_name": null,
	"rolly_name": null,
	"jhk_name": null,
	"created_at": "2022-01-29T03:54:35.882844Z",
	"updated_at": "2022-01-29T03:54:35.882881Z"
}
```


####  4. Delete Category
##### HTTP Request
`[DELETE] /api/v1/ecommerce/category/{category-slug}/delete`

##### Content-type
`'application/json'`

##### Success Status Code
`204`

##### HTTP Headers
`Authorization : Bearer --access-token--`
