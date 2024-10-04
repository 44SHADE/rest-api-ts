# rest-api-typescript
Пример архитектуры *REST API* на TypeScript. С использованием Node.js и Express, MongoDB для хранения данных, JWT для авторизации и Docker для быстрого развертывания. 
## Структура проекта
```
src
├── auth
│   ├── controllers
│   └── middleware
├── common
│   ├── config
│   ├── interfaces
│   ├── middleware
│   ├── services
│   └── types
├── models                  
└── routes
    └── users
        ├── controllers
        ├── daos            - data access object
        ├── dto             - data transfer object
        ├── middleware
        └── services
```
## Установка
1. Клонируйте репозиторий:
    ```
    git clone https://github.com/44SHADE/rest-api-ts.git
    ```
2. Установите зависимости:
    ```
    npm install
    ```
3. Создайте **.env** файл (примеры переменных окружения см. в файле **.env-example**)
4. Запуск:
    ```
    PROD:
        npm run build
        npm run start:prod

    DEV:
        npm run start:dev  - nodemon

    DEBUG:
        npm run build
        npm run debug
    ```
5. Создание образа:
    ```
    docker build --build-arg db=mongodb://db:27017/DB_NAME --build-arg p=PORT --build-arg jwt=S3CR3T! -t rest_api:v1 .
    ```
## Маршруты
1. **POST** /users - create user
```
curl "http://localhost:port/users" \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/9.2.0' \
  -X POST \
  -d '{
  "username": "foo",
  "password": "bar",
  "email": "foobar@mail.ru"
}' 
```
```
RES: 
{
  "id": "idus3r"
}
```

2. **POST** /auth - JWT auth
```
curl "http://localhost:4141/auth" \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/9.3.3' \
  -H 'Authorization: Bearer S3cr3t!' \
  -X POST \
  -d '{
  "username": "foo",
  "password": "bar"
}' 
```
```
RES:
{
	"accessToken": "access token",
	"refreshToken": "refresh token"
}
```

3. **POST** /auth/refresh-token - refresh jwt token
```
curl "http://localhost:port/auth/refresh-token" \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/9.3.3' \
  -H 'Authorization: Bearer S3cr3t!' \
  -X POST \
  -d '{
  "refreshToken": "refresh token"
}' 
```
```
RES:
{
	"accessToken": "new access token",
	"refreshToken": "new refresh token"
}
```
4. **GET** /users - list users (for admin or all permission level)
```
curl "http://localhost:port/users" \
  -H 'User-Agent: insomnia/9.2.0' \
  -H 'Authorization: Bearer S3cr3t!' \
  -X GET 
```
```
RES: 
{
    [{USER}, {USER}, ....n]
}
```
5. **GET** /users/:userId - get user by id (for same user or admin)
```
curl "http://localhost:port/users/8LNZkDfSr" \
  -H 'User-Agent: insomnia/9.2.0' \
  -H 'Authorization: Bearer S3cr3t!' \
  -X GET
```
```
RES:
{
	"_id": "8LNZkDfSr",
	"username": "foo",
	"email": "foobar@mail.ru",
	"permissionFlags": 1,
	"createdAt": "time",
	"updatedAt": "time",
}
```
6. **PUT** /users/:userId - put doc by id (only admin or paid permission level)
```
curl "http://localhost:port/users/8LNZkDfSr" \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/9.3.3' \
  -H 'Authorization: Bearer S3cr3t!' \
  -X PUT \
  -d '{
  "username": "TEST"
  }' 
```
```
RES: status 204
```
7. **PATCH** /users/:userId - put doc by id (only admin or paid permission level)
```
curl "http://localhost:4141/users/8LNZkDfSr" \
  -H 'Content-Type: application/json' \
  -H 'User-Agent: insomnia/9.3.3' \
  -H 'Authorization: Bearer S3cr3t!' \
  -X PATCH \
  -d '{
  "username": "TEST"
  }' 
```
```
RES: status 204
```