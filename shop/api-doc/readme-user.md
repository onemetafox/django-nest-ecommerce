## REST APIs - User

1. Users List
2. My Profile
3. Resgiter
4. Update
5. Delete
6. Details

#### Server URL or Base URL

`http://127.0.0.1:8002/`

##### 1. Users List

##### HTTP Request

`[GET] /api/v1/user/`

##### Content-type

`'application/json'` `'Authorization: Bearer SuperUSER token`

##### Success Status Code

`200`

##### Sample Response

```json
{
	"count": 2,
	"next": null,
	"previous": null,
	"results": [
		{
			"id": 1,
			"first_name": "",
			"last_name": "",
			"username": "3rchuss",
			"email": "3rchuss@gmail.com",
			"is_active": true,
			"date_joined": "2022-02-04T08:58:48.334868Z",
			"last_login": "2022-02-04T10:27:28.948736Z",
			"user_profile": null,
			"user_shipping_address": [],
			"user_billing_address": null
		},
		{
			"id": 29,
			"first_name": "Jesus Maria",
			"last_name": "Miñan",
			"username": "4rchuss3@gmail.com",
			"email": "4rchuss3@gmail.com",
			"is_active": false,
			"date_joined": "2022-02-09T21:15:49.902000Z",
			"last_login": null,
			"user_profile": {
				"slug": "4rchuss3gmailcom",
				"is_email_verified": false,
				"cookies_accepted": false,
				"cookies_version": null,
				"role": "USER",
				"language": null
			},
			"user_shipping_address": [
				{
					"slug": "4rchuss3gmailcom",
					"phone_number": 622085454,
					"name": "Dirección de Facturación",
					"address": "ASDF",
					"city": "DEIFONTES",
					"province": "granada",
					"postal_code": 18570,
					"created_at": "2022-02-09T19:07:37.120320Z",
					"country": "ES"
				},
				{
					"slug": "4rchuss3gmailcom-1",
					"phone_number": 622085454,
					"name": "Dirección de Envio",
					"address": "ASDF",
					"city": "DEIFONTES",
					"province": "granada",
					"postal_code": 18570,
					"created_at": "2022-02-09T19:07:37.124319Z",
					"country": "ES"
				}
			],
			"user_billing_address": {
				"slug": "4rchuss3gmailcom",
				"phone_number": "622085454",
				"company_name": "aSDFAS",
				"address": "ASDF",
				"city": "DEIFONTES",
				"province": "granada",
				"postal_code": "18570",
				"cif": "DFAD",
				"created_at": "2022-02-09T19:07:37.115358Z",
				"email": "3rchuss@gmail.com",
				"country": "ES"
			}
		}
	]
}
```

##### Error Status Code

`401`

##### Sample Response

```json
{
	"detail": "Given token not valid for any token type",
	"code": "token_not_valid",
	"messages": [
		{
			"token_class": "AccessToken",
			"token_type": "access",
			"message": "Token is invalid or expired"
		}
	]
}
```

#### 2. My Profile

##### HTTP Request

`[GET] /api/v1/user/my-pofile/`

##### Content-type

`'application/json'` `'Authorization: Bearer token`

##### Success Status Code

`200`

##### Sample Response

```json
{
	"user_profile": {
		"id": 48,
		"first_name": "Jesus Maria",
		"last_name": "Abril Miñan",
		"username": "3rchuss3@gmail.com1",
		"email": "3rchuss3@gmail.com",
		"is_active": false,
		"date_joined": "2022-02-09T21:15:49.902000Z",
		"last_login": null,
		"user_profile": {
			"slug": "3rchuss3gmailcom",
			"is_email_verified": true,
			"cookies_accepted": true,
			"cookies_version": "0.1",
			"role": "USER",
			"language": "es-ES"
		},
		"user_shipping_address": [
			{
				"slug": "3rchuss3gmailcom",
				"phone_number": 622085454,
				"name": "Dirección de Facturación",
				"address": "ASDF",
				"city": "DEIFONTES",
				"province": "granada",
				"postal_code": 18570,
				"created_at": "2022-02-09T20:16:17.317197Z",
				"country": "ES"
			},
			{
				"slug": "3rchuss3gmailcom-1",
				"phone_number": 622085454,
				"name": "Dirección de Envio",
				"address": "ASDF",
				"city": "DEIFONTES",
				"province": "granada",
				"postal_code": 18570,
				"created_at": "2022-02-09T20:16:17.326198Z",
				"country": "ES"
			}
		],
		"user_billing_address": {
			"slug": "3rchuss3gmailcom",
			"phone_number": "622085454",
			"company_name": "aSDFAS",
			"address": "ASDF",
			"city": "DEIFONTES",
			"province": "granada",
			"postal_code": "18570",
			"cif": "DFAD",
			"created_at": "2022-02-09T20:16:17.313197Z",
			"email": "3rchuss@gmail.com",
			"country": "ES"
		}
	}
}
```

##### Error Status Code

`404`

##### Sample Response

```json
{
	"message": "User profile record not found"
}
```

#### 3. Resgiter

##### HTTP Request

`[POST] /api/v1/user/create/`

##### Content-type

`'application/json'` `'Authorization: Bearer token`

##### Success Status Code

`201`

##### Query Parameters

| Field                 | Validation                             | Description                         |
| --------------------- | -------------------------------------- | ----------------------------------- |
| username              | required, min_length: 3, max_length:80 | It can accept both username & email |
| password              | required, min_length: 8, max_length:80 |                                     |
| first_name            | required, min_length: 3, max_length:80 |                                     |
| last_name             | required, min_length: 3, max_length:80 |                                     |
| username              | required, min_length: 3, max_length:80 | Should be the email                 |
| email                 | required, unique                       |                                     |
| password              | required, min_length: 8                |                                     |
| confirm_password      | required, min_length: 8                |                                     |
| date_joined           | required, Date                         |                                     |
| user_profile          | required, Object                       |                                     |
| user_billing_address  | required, Object                       |                                     |
| user_shipping_address | required, [Object]                     | By default [user_billing_address]   |

##### Sample Request

```json
{
	"first_name": "Jesus Maria",
	"last_name": "Miñan",
	"username": "3rchuss3@gmail.com1",
	"email": "3rchuss3@gmail.com",
	"is_active": false,
	"date_joined": "2022-02-09T21:15:49.902000Z",
	"last_login": null,
	"password": "123456789",
	"confirm_password": "123456789",
	"user_profile": {
		"is_email_verified": false,
		"cookies_accepted": false,
		"cookies_version": null,
		"role": "COMMERCIAL",
		"language": "es-ES"
	},
	"user_shipping_address": [
		{
			"phone_number": 622085454,
			"name": "Dirección de Facturación",
			"address": "ASDF",
			"city": "DEIFONTES",
			"province": "granada",
			"postal_code": 18570,
			"created_at": "2022-02-08T21:15:50.236771Z",
			"country": "ES"
		}
	],
	"user_billing_address": {
		"phone_number": "622085454",
		"company_name": "aSDFAS",
		"address": "ASDF",
		"city": "DEIFONTES",
		"province": "granada",
		"postal_code": "18570",
		"cif": "DFAD",
		"created_at": "2022-02-08T21:15:50.234771Z",
		"email": "3rchuss@gmail.com",
		"country": "ES"
	}
}
```

##### Sample Response

```json
{
	"id":48,
  	"first_name": "Jesus Maria",
	"last_name": "Miñan",
	"username": "3rchuss3@gmail.com1",
  ...
}
```

#### 4. Update

##### HTTP Request

`[PATCH] /api/v1/user/:user-slug/update/`

##### Content-type

`'application/json'` `'Authorization: Bearer token`

##### Success Status Code

`200`

##### Sample Query

```json
{
	"first_name": "Jesus Maria",
	"last_name": "Abril Miñan",
	"username": "3rchuss3@gmail.com1",
	"email": "3rchuss3@gmail.com",
	"is_active": false,
	"date_joined": "2022-02-09T21:15:49.902000Z",
	"last_login": null,
	"password": "123456789",
	"confirm_password": "123456789",
	"user_profile": {
		"is_email_verified": true,
		"cookies_accepted": true,
		"cookies_version": "0.1",
		"role": "USER",
		"language": "es-ES"
	}
}
```

##### Sample Response

Full user

```json
{
	"id":48,
  	"first_name": "Jesus Maria",
	"last_name": "Abril Miñan",
	"username": "3rchuss3@gmail.com1",
  ...
}
```

#### 5. Delete

##### HTTP Request

`[DEL] /api/v1/user/:user-slug/delete/`

##### Content-type

`'application/json'` `'Authorization: Bearer token`

##### Success Status Code

`204`

#### 6. Details

##### HTTP Request

`[DEL] /api/v1/user/details/:id`

##### Content-type

`'application/json'` `'Authorization: Bearer token`

##### Success Status Code

`200`

##### Sample Response

Full user

```json
{
	"id":48,
  	"first_name": "Jesus Maria",
	"last_name": "Abril Miñan",
	"username": "3rchuss3@gmail.com1",
  ...
}
```
