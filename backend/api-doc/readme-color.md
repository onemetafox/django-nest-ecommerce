
## REST APIs - Color

1. Color List
2. Create Color
3. Update Color
4. Delete Color

#### Server URL or Base URL
`http://127.0.0.1:8002/`


####  1. Color List
##### HTTP Request
`[GET] /api/v1/ecommerce/color/`

##### Content-type
`'application/json'`

##### Success Status Code
`200`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Sample Response
```json
{
	"count": 19,
	"next": null,
	"previous": null,
	"results": [
		{
			"color_name": "AMARILLO",
			"slug": "amarillo",
			"description": "AMARILLO",
			"basic_color": "",
			"simple_color": "",
			"primary_color": "#E7E300",
			"secondary_color": "",
			"sticker_id": "108",
			"sticker_name": "Amarillo",
			"pfconcept_color": "#FAE700",
			"pms_color_reference": "",
			"jhk_color": "",
			"jhk_color_reference": "",
			"roly_color": "AMARILLO",
			"roly_color_id": "03",
			"makito_color": "AMA",
			"makito_color_ftp": "AMA",
			"is_active": true,
			"created_at": "2022-01-09T15:00:54.715390Z",
			"updated_at": "2022-01-09T15:00:54.715423Z"
		},
		{
			"color_name": "AZUL",
			"slug": "azul",
			"description": "AZUL",
			"basic_color": "",
			"simple_color": "",
			"primary_color": "#195BFF",
			"secondary_color": "",
			"sticker_id": "104",
			"sticker_name": "Azul",
			"pfconcept_color": "#0000FF",
			"pms_color_reference": "",
			"jhk_color": "",
			"jhk_color_reference": "",
			"roly_color": "",
			"roly_color_id": "",
			"makito_color": "AZUL",
			"makito_color_ftp": "AZUL",
			"is_active": true,
			"created_at": "2022-01-09T17:03:56.192431Z",
			"updated_at": "2022-01-09T17:03:56.192469Z"
		}
    ]
}
```

####  2. Create Color 

##### HTTP Request
`[POST] /api/v1/ecommerce/color/create/`

##### Content-type
`'application/json'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`201`

##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
color_name | required, min_length: 3, max_length:250 | 
is_active | boolean | 


##### Sample Request
```json
{
	"color_name" : "test-color",
	"description": "test-description",
	"basic_color": "test-basic-color",
	"simple_color": "test-simple-color",
	"primary_color": "test-primary-color",
	"secondary_color": null,
	"sticker_id": null,
	"sticker_name": null,
	"pfconcept_color": null,
	"pms_color_reference": null,
	"jhk_color": null,
	"jhk_color_reference": null,
	"roly_color": null,
	"roly_color_id": null,
	"makito_color": null,
	"makito_color_ftp": null,
	"is_active": false
}
```

##### Sample Response
```json
{
	"color_name": "test-color",
	"slug": "test-color-3",
	"description": "test-description",
	"basic_color": "test-basic-color",
	"simple_color": "test-simple-color",
	"primary_color": "test-primary-color",
	"secondary_color": null,
	"sticker_id": null,
	"sticker_name": null,
	"pfconcept_color": null,
	"pms_color_reference": null,
	"jhk_color": null,
	"jhk_color_reference": null,
	"roly_color": null,
	"roly_color_id": null,
	"makito_color": null,
	"makito_color_ftp": null,
	"is_active": false,
	"created_at": "2022-01-26T03:20:40.905769Z",
	"updated_at": "2022-01-26T03:20:40.905825Z"
}
```


####  3. Update Color 

##### HTTP Request
`[PUT] /api/v1/ecommerce/color/{color-slug}/update/`

##### Content-type
`'application/json'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`200`

##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
color_name | required, min_length: 3, max_length:250 | 
is_active | boolean | 


##### Sample Request
```json
{
	"color_name" : "test-color",
	"description": "test-description",
	"basic_color": "test-basic-color",
	"simple_color": "test-simple-color",
	"primary_color": "test-primary-color",
	"secondary_color": null,
	"sticker_id": null,
	"sticker_name": null,
	"pfconcept_color": null,
	"pms_color_reference": null,
	"jhk_color": null,
	"jhk_color_reference": null,
	"roly_color": null,
	"roly_color_id": null,
	"makito_color": null,
	"makito_color_ftp": null,
	"is_active": false
}
```

##### Sample Response
```json
{
	"color_name": "test-color",
	"slug": "test-color-3",
	"description": "test-description",
	"basic_color": "test-basic-color",
	"simple_color": "test-simple-color",
	"primary_color": "test-primary-color",
	"secondary_color": null,
	"sticker_id": null,
	"sticker_name": null,
	"pfconcept_color": null,
	"pms_color_reference": null,
	"jhk_color": null,
	"jhk_color_reference": null,
	"roly_color": null,
	"roly_color_id": null,
	"makito_color": null,
	"makito_color_ftp": null,
	"is_active": false,
	"created_at": "2022-01-26T03:20:40.905769Z",
	"updated_at": "2022-01-26T03:20:40.905825Z"
}
```


####  4. Delete Color
##### HTTP Request
`[DELETE] /api/v1/ecommerce/color/{color-slug}/delete`

##### Content-type
`'application/json'`

##### Success Status Code
`204`

##### HTTP Headers
`Authorization : Bearer --access-token--`
