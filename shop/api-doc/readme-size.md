
## REST APIs - Size

1. Size List
2. Create Size
3. Update Size
4. Delete Size

#### Server URL or Base URL
`http://127.0.0.1:8002/`


####  1. Size List
##### HTTP Request
`[GET] /api/v1/ecommerce/size/`

##### Content-type
`'application/json'`

##### Success Status Code
`200`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Sample Response
```json
{
	"count": 126,
	"next": "http://127.0.0.1:8002/api/v1/ecommerce/size/?page=2",
	"previous": null,
	"results": [
		{
			"size_name": "S/T",
			"slug": "st",
			"cifra_size": "",
			"makito_size": "S/T",
			"pfconcept_size": "",
			"roly_size": "",
			"roly_size_id": "",
			"jhk_size": "",
			"order": 1,
			"created_at": "2022-01-09T17:45:47.647911Z",
			"updated_at": "2022-01-09T17:45:47.647942Z"
		},
		{
			"size_name": "HOM",
			"slug": "hom",
			"cifra_size": "",
			"makito_size": "HOM",
			"pfconcept_size": "",
			"roly_size": "",
			"roly_size_id": "",
			"jhk_size": "",
			"order": 2,
			"created_at": "2022-01-09T17:46:15.943477Z",
			"updated_at": "2022-01-09T17:46:15.943512Z"
		}
	]
}
```

####  2. Create Size 

##### HTTP Request
`[POST] /api/v1/ecommerce/size/create/`

##### Content-type
`'application/json'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`201`

##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
size_name | required, min_length: 3, max_length:250 | 



##### Sample Request
```json
{
	"size_name": "TEST-SIZE",
	"cifra_size": "",
	"makito_size": "",
	"pfconcept_size": "TEST",
	"roly_size": "",
	"roly_size_id": "",
	"jhk_size": ""
}
```

##### Sample Response
```json
{
	"size_name": "TEST-SIZE",
	"slug": "test-size",
	"cifra_size": "",
	"makito_size": "",
	"pfconcept_size": "TEST",
	"roly_size": "",
	"roly_size_id": "",
	"jhk_size": "",
	"order": 127,
	"created_at": "2022-01-26T03:34:27.667646Z",
	"updated_at": "2022-01-26T03:34:27.667684Z"
}
```


####  3. Update Size 

##### HTTP Request
`[PUT] /api/v1/ecommerce/size/{size-slug}/update/`

##### Content-type
`'application/json'`

##### HTTP Headers
`Authorization : Bearer --access-token--`

##### Success Status Code
`200`

##### Query Parameters

Field | Validation | Description
--------- | ------- | -----------
size_name | required, min_length: 3, max_length:250 | 



##### Sample Request
```json
{
	"size_name": "TEST-SIZE",
	"cifra_size": "",
	"makito_size": "",
	"pfconcept_size": "TEST",
	"roly_size": "",
	"roly_size_id": "",
	"jhk_size": ""
}
```

##### Sample Response
```json
{
	"size_name": "TEST-SIZE",
	"slug": "test-size",
	"cifra_size": "",
	"makito_size": "",
	"pfconcept_size": "TEST",
	"roly_size": "",
	"roly_size_id": "",
	"jhk_size": "",
	"order": 127,
	"created_at": "2022-01-26T03:34:27.667646Z",
	"updated_at": "2022-01-26T03:34:27.667684Z"
}
```


####  4. Delete Size
##### HTTP Request
`[DELETE] /api/v1/ecommerce/size/{size-slug}/delete`

##### Content-type
`'application/json'`

##### Success Status Code
`204`

##### HTTP Headers
`Authorization : Bearer --access-token--`
