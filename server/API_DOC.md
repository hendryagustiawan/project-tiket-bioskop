## API DOCUMENTATION

## Entitas 

_Users_
- email : string 
- password : string 
- role : string
- phoneNumber : string

_Movies_
- title : string
- imgUrl : string
- genre : string
- producer : string
- director : string
- writer : string
- synopsis : text
- cast : string
- price : integer
- duration : integer
- UserId : integer
- ProductionId : integer

_Productions_
- name : string

List endpoints:
​
- `POST /user/add`
- `POST /user/login`
- `GET  /user`
- `GET  /user/:id`
- `PUT /user/edit/:id`
- `DELETE /user/delete/:id`
- `POST /movie/add`
- `PUT /movie/edit/:id`
- `GET /movie`
- `GET /movie/:id`
- `DELETE /movie/delete/:id`

### POST /user/add

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

