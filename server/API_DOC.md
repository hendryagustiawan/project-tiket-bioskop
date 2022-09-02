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
- `POST /user/register`
- `POST /user/login`
- `GET  /user`
- `GET  /user/one-user`
- `GET  /user/:id`
- `PUT /user/:id`
- `DELETE /user/:id`
- `POST /movie/add`
- `PUT /movie/:id`
- `GET /movie`
- `GET /movie/:id`
- `DELETE /movie/:id`

### POST /user/register

Request: body

```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Ok)_

- status: 201

```json
{
    "id": 4,
    "username": "Ali",
    "email": "ali@mail.com",
    "role": "admin",
    "phoneNumber": "62689898098"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Minimal character password 5",
        "Username Can't be Empty",
        "Password Can't be Empty",
        "Email Can't be Empty",
        "Email already registered",
        "Wrong Email Format",
        "Phone Number Can't be Empty"
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### POST /user/login

Request: body

```json
{
  "email": "string",
  "password": "string",
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Email and Password is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### GET /user
> Get ALL User

_Response (200 - OK)_

Request:

- headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
   {
        "id": 1,
        "username": "Manda",
        "email": "manda@mail.com",
        "role": "Admin",
        "phoneNumber": "6235786590894",
    },
    {
        "id": 2,
        "username": "Ana",
        "email": "ana@mail.com",
        "role": "Admin",
        "phoneNumber": "626955890996",
    }
]
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### GET /user/:id
> Get User By Id

_Response (200 - OK)_

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "Id": "integer"
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "username": "Manda",
    "email": "manda@mail.com",
    "role": "Admin",
    "phoneNumber": "6235786590894"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### GET /user/one-user
> Get User By UserId

_Response (200 - OK)_

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- UserId:
```json
{
  "UserId": "integer"
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "username": "Manda",
    "email": "manda@mail.com",
    "role": "Admin",
    "phoneNumber": "6235786590894"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### PUT /user/:id
> Edit User

_Response (200 - OK)_

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "Id": "integer"
}
```

Request: body

```json
{
  "email": "string",
  "password": "string",
  "username": "string",
  "phoneNumber": "string"
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "email": "ali@mail.com",
    "phoneNumber": "574739085009"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Minimal character password 5",
        "Username Can't be Empty",
        "Password Can't be Empty",
        "Email Can't be Empty",
        "Wrong Email Format",
        "Phone Number Can't be Empty"
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

## 6. DELETE /user/:id

> Delete User

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
{
  "message": "Success to delete data user"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### POST /movie/add

Request: body

```json
{
  title : "string", 
  imgUrl : "string", 
  genre : "string", 
  producer : "string", 
  director : "string",
  writer : "string", 
  synopsis : "text", 
  cast : "string", 
  price : "integer", 
  duration : "integer", 
  ProductionId : "integer",

}
```

Request: UserId

```json
{
  UserId : "integer"
}
```

_Response (200 - Ok)_

```json
{
    "id": 6,
    "title": "Spider-Man: Home Away",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    "genre": "Action, Adventure, Fantasy, Sci-Fi",
    "producer": "Kevin Feige and Amy Pascal",
    "director": "Jon Watt",
    "writer": "Chris MKenna, Erik Sommers, Stan Lee, Steve Ditko",
    "synopsis": "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange to make the world forget that he is Spider-Man. The spell goes horribly wrong and shatters the multiverse, bringing in monstrous villains that could destroy the world.",
    "cast": "Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, etc",
    "price": 100000,
    "duration": 148,
    "UserId": 5,
    "ProductionId": 4,
    "updatedAt": "2022-09-02T13:28:29.553Z",
    "createdAt": "2022-09-02T13:28:29.553Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Minimal character password 5",
        "Username Can't be Empty",
        "Password Can't be Empty",
        "Email Can't be Empty",
        "Email already registered",
        "Wrong Email Format",
        "Phone Number Can't be Empty"
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### GET /movie
> Get ALL Movie

_Response (200 - OK)_

Request:

- headers:
```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 3,
        "title": "Spider-Man: No Way Home",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
        "genre": "Action, Adventure, Fantasy, Sci-Fi",
        "producer": "Kevin Feige and Amy Pascal",
        "director": "Jon Watts",
        "writer": "Chris McKenna, Erik Sommers, Stan Lee, Steve Ditko",
        "synopsis": "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange to make the world forget that he is Spider-Man. The spell goes horribly wrong and shatters the multiverse, bringing in monstrous villains that could destroy the world.",
        "cast": "Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, etc",
        "price": 45000,
        "duration": 148,
        "UserId": 1,
        "ProductionId": 4,
        "createdAt": "2022-08-13T16:03:00.057Z",
        "updatedAt": "2022-08-13T16:03:00.057Z"
    },
    {
        "id": 4,
        "title": "Spider-Man: Home Away",
        "imgUrl": "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
        "genre": "Action, Adventure, Fantasy, Sci-Fi",
        "producer": "Kevin Feige and Amy Pascal",
        "director": "Jon Watts",
        "writer": "Chris McKenna, Erik Sommers, Stan Lee, Steve Ditko",
        "synopsis": "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange to make the world forget that he is Spider-Man. The spell goes horribly wrong and shatters the multiverse, bringing in monstrous villains that could destroy the world.",
        "cast": "Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, etc",
        "price": 45000,
        "duration": 148,
        "UserId": 5,
        "ProductionId": 4,
        "createdAt": "2022-09-02T13:22:04.850Z",
        "updatedAt": "2022-09-02T13:22:04.850Z"
    }
]
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### GET /movie/:id
> Get Movie By Id

_Response (200 - OK)_

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "Id": "integer"
}
```

_Response (200 - OK)_
```json
{
    "id": 3,
    "title": "Spider-Man: No Way Home",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    "genre": "Action, Adventure, Fantasy, Sci-Fi",
    "producer": "Kevin Feige and Amy Pascal",
    "director": "Jon Watts",
    "writer": "Chris McKenna, Erik Sommers, Stan Lee, Steve Ditko",
    "synopsis": "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange to make the world forget that he is Spider-Man. The spell goes horribly wrong and shatters the multiverse, bringing in monstrous villains that could destroy the world.",
    "cast": "Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, etc",
    "price": 45000,
    "duration": 148,
    "UserId": 1,
    "ProductionId": 4,
    "createdAt": "2022-08-13T16:03:00.057Z",
    "updatedAt": "2022-08-13T16:03:00.057Z"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

### PUT /movie/:id
> Edit Movie

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "Id": "integer"
}
```

Request: body

```json
{
  title : "string", 
  imgUrl : "string", 
  genre : "string", 
  producer : "string", 
  director : "string",
  writer : "string", 
  synopsis : "text", 
  cast : "string", 
  price : "integer", 
  duration : "integer", 
  ProductionId : "integer",
}
```

_Response (200 - OK)_
```json
{
    "id": 5,
    "title": "Spider-Man: No Way Home",
    "imgUrl": "https://upload.wikimedia.org/wikipedia/en/0/00/Spider-Man_No_Way_Home_poster.jpg",
    "genre": "Action, Adventure, Fantasy, Sci-Fi",
    "producer": "Kevin Feige and Amy Pascal",
    "director": "Jon Watts",
    "writer": "Chris McKenna, Erik Sommers, Stan Lee, Steve Ditko",
    "synopsis": "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange to make the world forget that he is Spider-Man. The spell goes horribly wrong and shatters the multiverse, bringing in monstrous villains that could destroy the world.",
    "cast": "Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon, etc",
    "price": 50000,
    "duration": 148,
    "UserId": 5,
    "ProductionId": 5,
    "createdAt": "2022-09-02T13:25:21.093Z",
    "updatedAt": "2022-09-02T13:57:25.096Z"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": [
        "Title Can't be Empty",
        "Image Can't be Empty",
        "Genre Can't be Empty",
        "Producer Can't be Empty",
        "Director Can't be Empty",
        "Writer Can't be Empty",
        "Synopsis Can't be Empty",
        "Cast Can't be Empty",
        "Price Can't be Empty",
        "Duration Can't be Empty"
    ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
## 6. DELETE /movie/:id

> Delete Movie

Request:

- headers:
```json
{
  "access_token": "string"
}
```

- params:
```json
{
  "id": "integer"
}
```

_Response (200 - OK)_
```json
{
  "message": "Success to delete data movie"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```


