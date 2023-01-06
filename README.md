# Online Storefront API

## API Description

This API represents an online storefront to showcase their product ideas.
The users will be able to browse all store products, or see the specifics of a single product and add their favorite products to an order that they can view on a cart page

This Project using these technologyes:

- Typescript Node.js and Express
- Postgres as a RDBMS for porject
- Jasmine testing framework for testing

## Getting started

<hr>

### Step 1: install node and npm in your device

1- This project requires you to have pre-installed node.js and npm or yarn to manage node packages:

- To check the node.js version use this command:

`node -v`

If you don't have node.js in your device you can visit [Node.js website to install Node](https://nodejs.org/en/).

### Step 2 : Clone The project Folder.

### Step 3 : Install all project dependencies

After cloning the repo to your device move to the project Folder and run this command to install all project dependencies

`npm install`

### Step 4 : Create Two databases in your local:

one of databases for development and the other for testing

### Step 4 : Create your (.env) file

The project will not be able to run correctly if there is no (.env) file or if any of its data is missing so you have to create this file correctly.

#### To create .env file

1 - Rename the file (env-example) to be (.env)
2 - Open your (.env file) and fill in the missing values for variables.

<hr>

## Run The project

<hr>

The project will run on localhost port 3000 you can change it based on your needs from `src/server/server.ts` file.

- To run the project you have to run this command after you are completed all of the previous steps:

<br>

`npm run start`

<br>

## API Endpoints:

<br>

#### Users EndPoints

- Create User :

  - Endpoint: /users/create
  - Request Method : POST
  - Body Request : should pass these data to body request

    {
    "firstName": "",
    "lastName": "",
    "username": "",
    "password": ""
    }

    Example:

    {
    "firstName": "Allie",
    "lastName": "Grater",
    "username": "agrater",
    "password": "123"
    }

  - Request Return : This endpoint will return a jwt token that will be used to access to other project end points.

    Example:

    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng"

- Show User [token required]

  - Endpoint: /users/{user_id} , Example -> /users/1
  - Request Method : GET
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a user data

  Example:

  {
  "id": 1,
  "firstname": "Allie",
  "lastname": "Grater",
  "username": "agrater",
  "password": "$2b$10$ApP9wuNln9NJ/al1w66E0egUaMPmBDcDuKjpg5Y/VRqZqzK6WiHYS"
  }

- Index Users [token required]

  - Endpoint: /users
  - Request Method : GET
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a all users data

    Example:
    [
    {
    "id": 3,
    "firstname": "first name",
    "lastname": "last name",
    "username": "user name",
    "password": "$2b$10$ApP9wuNln9NJ/al1w66E0egUaMPmBDcDuKjpg5Y/VRqZqzK6WiHYS"
    },
    {
    "id": 4,
    "firstname": "first name",
    "lastname": "last name",
    "username": "user name",
    "password": "$2b$10$IZUYwaCXHhljiZdwktNAS.4q6TQehxPVYKzPyML5N.PIJtwjSdX9G"
    }
    ]

- Update User [token required]:

  - Endpoint: /users/{user_id} , Example -> /users/1
  - Request Method : PUT
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

      Example:
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Body Request : should pass these data to body request

    {
    "firstName": "",
    "lastName": "",
    "username": "",
    "password": ""
    }

    Example:

    {
    "firstName": "Allie",
    "lastName": "Grater",
    "username": "agrater",
    "password": "123"
    }

  - Request Return : This endpoint will return a message.

    Example:

    User information updated sucessfuly

- Delete User [token required]

  - Endpoint: /users/{user_id} , Example -> /users/1
  - Request Method : DELETE
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a message.

  Example:

  The User agrater deleted

<br>

#### Products EndPoints

<br>

- Create Product :

  - Endpoint: /products/create
  - Request Method : POST
  - Body Request : should pass these data to body request

    {
    name: "",
    price: ,
    category: "",
    }

    Example:

    {
    name: "Product 1",
    price: 100,
    category: "Product category",
    }

  - Request Return : This endpoint will return a created product data.

    Example:

    {
    id: 1,
    name: "Product 1",
    price: 100,
    category: "Product category",
    }

- Show Product [token required]

  - Endpoint: /products/{product_id} , Example -> /products/1
  - Request Method : GET
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a product data

  Example:

  {
  id: 1,
  name: "Product 1",
  price: 100,
  category: "Product category",
  }

- Index Products [token required]

  - Endpoint: /products
  - Request Method : GET
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a all products data

    Example:
    [
    {
    id: 1,
    name: "Product 1",
    price: 100,
    category: "Product category",
    },
    {
    id: 2,
    name: "Product 2",
    price: 100,
    category: "Product category",
    }
    ]

- Update Product [token required]:

  - Endpoint: /products/{product_id} , Example -> /products/1
  - Request Method : PUT
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

      Example:
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Body Request : should pass these data to body request

    {
    name: "",
    price: ,
    category: "",
    }

    Example:

    {
    name: "Product 2",
    price: 200,
    category: "Product category",
    }

  - Request Return : This endpoint will return a message.

    Example:

    Your Product updated sucessfuly

- Delete Product [token required]

  - Endpoint: /products/{product_id} , Example -> /products/1
  - Request Method : DELETE
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a message.

  Example:

  The product Product 2 deleted

<br>

#### Orders EndPoints

<br>

- Create Order :

  - Endpoint: /orders/create
  - Request Method : POST
  - Body Request : should pass these data to body request

    {
    "status": "",
    "user_id":
    }

    Example:

    {
    "status": "active",
    "user_id": 1
    }

  - Request Return : This endpoint will return a message.

    Example:

    Your order created sucessfuly

- Show Order [token required]

  - Endpoint: /orders/{order_id} , Example -> /orders/1
  - Request Method : GET
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a order data

  Example:

  {
  "id": 20,
  "status": "active",
  "user_id": "2"
  }

- Index Orders [token required]

  - Endpoint: /orders
  - Request Method : GET
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a all orders data

    Example:
    [
    {
    "id": 20,
    "status": "active",
    "user_id": "2"
    },
    {
    "id": 21,
    "status": "completed",
    "user_id": "3"
    }
    ]

- Update Order [token required]:

  - Endpoint: /orders/{order_id} , Example -> /orders/1
  - Request Method : PUT
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

      Example:
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Body Request : should pass these data to body request

    {
    "status": "",
    "user_id":
    }

    Example:

    {
    "status": "completed",
    "user_id": 2
    }

  - Request Return : This endpoint will return a message.

    Example:

    Your order updated sucessfuly

- Delete Order [token required]

  - Endpoint: /orders/{order_id} , Example -> /orders/1
  - Request Method : DELETE
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Request Return : This endpoint will return a message.

  Example:

  The Order deleted

- Add Product to Order [token required]

  - Endpoint: /orders/{order_id}/products , Example -> /orders/1/products
  - To use this endpoint you must have a products created before.
  - Request Method : POST
  - Header Request :
    pass Authorization to request header to use this endpoint .
    The Authorization value will be:
    <br>

    - Bearer keyword
    - jwt token that returned from creating user endpoint

    Example:
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJmaXJzdG5hbWUiOiJBbGxpZSIsImxhc3RuYW1lIjoiR3JhdGVyIiwidXNlcm5hbWUiOiJhZ3JhdGVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaDNCODFoQ1RVV282TTl3NWNvT2lwT0NvVGM5c0ZrSUZJc20uakJyNWtDc1VZbWVhWk5uRWkifSwiaWF0IjoxNjczMDE2MDUwfQ.O4B9BiYWC-84jQ6FwYFPyi4QwT6AUYz_uUhbWA231Ng

  - Body Request : should pass these data to body request

    {
    "product_id": "",
    "quantity":
    }

    Example:

    {
    "product_id": "2",
    "quantity": 300
    }

  - Request Return : This endpoint will return a data for order products.

  Example:

  {
  "id": 31,
  "quantity": 300,
  "order_id": "21",
  "product_id": "25"
  }

<br>

## Test The project

<hr>

To test the project you should have a separate database for testing to avoid errors of changing values of the functions' returns, and to run test script run this command:

<br>

`npm run test`

<br>
