[>_<]: # (Define the title of the whole document)

# API-Client-Service api document

[>_<]: # (Define the host of serveral categories)

## http://127.0.0.1

[>_<]: # (Define a category)

### Category1

---

[>_<]: # (Define an example of a api block)

> **Routes** 

{des}: Route used for user login.

{path}: /users/login

{method}: GET

{req}:

- query : ?a=1&b=2&c=hello&d=world
- header :
	- content-type : application/json
	- authroization : abd9912f
- body : 
```json
{
	"list":[
		{
			"uname":"bb-8",
			"password":"xxxxxxxx"
		}
	]
}

```

{res}:

- content-type: application/json
- sample: 
```json
{
	"status":200,
	"message":"success",
	"content":{
		"list":[
		]
	}
}
```
- errors: 
```json
[
	{
		"code":415,
		"message":"unauthorized"
	}
]
```

{note}: when request this user should be careful...

---
