# Online Storefront API

<br>

## API Description

This API represents an online storefront to showcase their product ideas.
The users will be able to browse all store products, or see the specifics of a single product and add their favorite products to an order that they can view on a cart page

This Project using these technologyes:

- Typescript Node.js and Express
- Postgres as a RDBMS for porject
- Jasmine testing framework for testing

<br>

## Getting started

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

one of databases for development and the other for testing.
This project uses postgres RDBMS to manage databases you can use postgres or any type of RDBMS to create and manage the project database

### Database creation instruction:

- start postgres server : by this command → `brew services start postgresql`
- Postgres Database will use -> `5432 Port` to start running

#### To database creation follow these steps:

- 1 - Open postgres by following this command:
  `psql postgres`
- 2 - create two databases ( development, testing ) by following this command:
  `CREATE DATABASE database_name;`
  Example ->
  `CREATE DATABASE fantasy_worlds_dev;`
- 3 - Create user to access and manage the datavase by this command:
  `CREATE USER user_name WITH PASSWORD 'password123';`
  Example ->
  `CREATE USER full_stack_user WITH PASSWORD 'password123';`
- 4 - Give the created user all privileges to the database
  `GRANT ALL PRIVILEGES ON DATABASE database_name TO user_name;`
  Example ->
  `GRANT ALL PRIVILEGES ON DATABASE fantasy_worlds_dev TO full_stack_user;`

#### Database migration :

After you have, complete databases creation all you have to do is run the database migration command to create the project database structure.

- Migration command : `db-migrate up`
- If you want rollback of migration use this command: `db-migrate down`

#### Database schemas

This project need four tables in database to run:

Database Tables:

```

Schema | Name           | Type  | Owner
--------+----------------+-------+------------
public | migrations     | table | store_user
public | order_products | table | store_user
public | orders         | table | store_user
public | products       | table | store_user
public | users          | table | store_user

```

(5 rows)

##### Users Table:

- Table description : users table will have store user information (firstname , lastname , username, password).
- Table Schema :

```

                                     Table "public.users"
  Column   |         Type          | Collation | Nullable |              Default
-----------+-----------------------+-----------+----------+-----------------------------------
 id        | integer               |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(50) |           | not null |
 lastname  | character varying(50) |           | not null |
 username  | character varying(60) |           | not null |
 password  | character varying     |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

```

##### Products Table:

- Table description : products table will have products of store (name , price , category).
- Table Schema :

```

                                     Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default
----------+------------------------+-----------+----------+--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(255) |           | not null |
 price    | integer                |           | not null |
 category | character varying(60)  |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE


```

##### Orders Table:

- Table description : orders table will have orders information (status , user).
- Table Schema :

```
                                    Table "public.orders"
 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 status  | character varying(64) |           | not null |
 user_id | bigint                |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

```

##### Order Products (JOIN) table

- Table description : is a join table that will use to create a user cart this table will join order with products table
- Table Schema :

```
                              Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE

```

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

<br>
<br>

To test the project you should have a separate database for testing to avoid errors of changing values of the functions' returns, and to run test script run this command:

<br>

`npm run test`

<br>
```
