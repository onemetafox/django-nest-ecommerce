## REST APIs - Auth

1. Signup
2. Login

#### Server URL or Base URL

`http://127.0.0.1:8002/`

#### 1. Signup

##### HTTP Request

`[POST] /api/v1/auth/signup/`

##### Content-type

`'application/json'`

##### Success Status Code

`201`

##### Query Parameters

| Field            | Validation                                          | Description |
| ---------------- | --------------------------------------------------- | ----------- |
| first_name       | required, min_length: 3, max_length:80              |
| last_name        | required, min_length: 3, max_length:80              |
| username         | required, min_length: 3, max_length:80, unique      |
| email            | required, email, max_length:250, unique             |
| password         | required, min_length: 8, max_length:80              |
| confirm_password | required, min_length: 3, max_length:80, eq:password |

##### Sample Request

```json
{
	"first_name": "user1",
	"last_name": "user1",
	"username": "user1",
	"email": "user1@gmail.com",
	"password": "12345678",
	"confirm_password": "12345678"
}
```

##### Sample Response

```json
{
	"message": "User registration completed successfully."
}
```

#### 2. Login

##### HTTP Request

`[POST] /api/v1/auth/login/`

##### Content-type

`'application/json'`

##### Success Status Code

`200`

##### Query Parameters

| Field    | Validation                             | Description                         |
| -------- | -------------------------------------- | ----------------------------------- |
| username | required, min_length: 3, max_length:80 | It can accept both username & email |
| password | required, min_length: 8, max_length:80 |

##### Sample Request

```json
{
	"username": "user1",
	"password": "12345678"
}
```

##### Sample Response

```json
{
	"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY0MDMxMzU2NywiaWF0IjoxNjQwMjI3MTY3LCJqdGkiOiI3OWIzYzIyMDZmMmM0MzBjOGIwMTlkNmQ5YjRkNzIwYSIsInVzZXJfaWQiOjJ9.p7FomYlwIcfc9tlJHri67tA6r1NZQf5ZNTMvBcBkSG4",
	"access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQwMjQ1MTY3LCJpYXQiOjE2NDAyMjcxNjcsImp0aSI6ImUzZWU4OTJiOWUyMzRlOGNhZTViZTY3YWY2YmI1Y2Y5IiwidXNlcl9pZCI6Mn0.rKuvZK19Q1jfyUFKK_unk9wmjgtNGUnq2kaU__BjAM4",
	"access_token_life_time_in_seconds": 18000.0,
	"refresh_token_life_time_in_seconds": 86400.0
}
```

#### 3. Verify Token

##### HTTP Request

`[POST] /api/v1/auth/login/verify/`

##### Content-type

`'application/json'`

##### Success Status Code

`200`

##### Query Parameters

| Field | Validation | Description  |
| ----- | ---------- | ------------ |
| token | required   | Access token |

#### 4. Refresh Token

##### HTTP Request

`[POST] /api/v1/auth/login/refresh/`

##### Content-type

`'application/json'`

##### Success Status Code

`200`

##### Query Parameters

| Field | Validation | Description  |
| ----- | ---------- | ------------ |
| token | required   | Access token |
