# Shopping List FullStack Challenge - Backend

## Introduction

This project is the backend for the Shopping List App. It provides a set of RESTful API endpoints for managing a shopping list, including operations to get all items, add an item, edit an item, and delete an item. The backend is built using the Gin web framework, connects to a PostgreSQL database, and includes Swagger documentation for easy API exploration and testing.

## Purpose

The purpose of this backend is to offer a robust and efficient way to manage shopping list items through a set of well-defined API endpoints. It includes support for Cross-Origin Resource Sharing (CORS) to allow connections from local development environments, and Swagger documentation for interactive API exploration.

## API Endpoints

### Base URL

- **Host:** `localhost:8080`
- **Base Path:** `/shopping-list-api/v1`

### Endpoints

- **Get All Items**
  - **Method:** `GET`
  - **Path:** `/shopping-list-api/v1/items`
  - **Description:** Retrieves all items from the shopping list.
  - **Handler:** `ItemsHandler`

- **Add an Item**
  - **Method:** `POST`
  - **Path:** `/shopping-list-api/v1/items`
  - **Description:** Adds a new item to the shopping list.
  - **Handler:** `AddItemHandler`

- **Edit an Item**
  - **Method:** `PUT`
  - **Path:** `/shopping-list-api/v1/items/:id`
  - **Description:** Edits an existing item in the shopping list.
  - **Handler:** `EditItemHandler`

- **Delete an Item**
  - **Method:** `DELETE`
  - **Path:** `/shopping-list-api/v1/items/:id`
  - **Description:** Deletes an item from the shopping list.
  - **Handler:** `DeleteItemHandler`

### CORS Configuration

This API uses CORS rules to allow connections from the following origins:

- `http://localhost:3000`
- `http://localhost:5001`

### Swagger Documentation

Swagger documentation is available to explore and test the API endpoints interactively. You can access the Swagger UI at the following URL:

- **Swagger URL:** [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)

## Running Tests

To ensure the functionality and reliability of the API, we have implemented unit tests. Follow these steps to run the tests:

1. **Install Test Dependencies:**
   Make sure all test dependencies are installed by running:

   ```sh
   go mod tidy
   ```

2. **Run Tests:**
   Execute the following command to run all tests:

   ```sh
   go test ./...
   ```

3. **Run Coverage Tests:**
   Execute the following command to run all tests:

   ```sh
   go test ./...
   ```

The tests cover various aspects of the API, including handler functions and database interactions.

## Compiling the Go Code

To compile the Go code and run the Shopping List API, follow these steps:

1. **Run the Application:**
   Use the following command to compile and run the application:

   ```sh
   go run cmd/shoppinglist-api/main.go
   ```

1. **Or Compile the Application:**
   Use the following command to compile and run the application:

   ```sh
   go build cmd/shoppinglist-api/main.go
   ./main.go
   ```

The API will start and be accessible at `http://localhost:8080`.

Ensure that your PostgreSQL database is set up and the necessary environment variables are configured before running the application.

## Dependencies

This project uses the following dependencies to support various functionalities:

### HTTP Framework and Middleware

- **[github.com/gin-gonic/gin](https://github.com/gin-gonic/gin)**
  - **Purpose:** A high-performance HTTP web framework for Go. Gin is known for its speed, low memory footprint, and efficient handling of HTTP requests, making it a popular choice for building APIs.
  
- **[github.com/gin-contrib/cors](https://github.com/gin-contrib/cors)**
  - **Purpose:** A middleware for handling Cross-Origin Resource Sharing (CORS) in the Gin framework. It enables configuring CORS policies to control access to your API from different origins.

### Database Interaction

- **[github.com/lib/pq](https://github.com/lib/pq)**
  - **Purpose:** A pure Go Postgres driver for the database/sql package. It provides an interface to interact with PostgreSQL databases, enabling CRUD operations and more advanced database interactions.

### Environment Management

- **[github.com/joho/godotenv](https://github.com/joho/godotenv)**
  - **Purpose:** A library for loading environment variables from a `.env` file into your application. This helps in managing configuration settings for different environments (development, testing, production) without hardcoding them into the application code.

### Testing

- **[github.com/stretchr/testify](https://github.com/stretchr/testify)**
  - **Purpose:** A comprehensive toolkit for writing unit tests in Go. It includes utilities for assertions, mocking, and testing HTTP requests, making it easier to write and manage tests.
  
- **[github.com/DATA-DOG/go-sqlmock](https://github.com/DATA-DOG/go-sqlmock)**
  - **Purpose:** A mock library for SQL driver interfaces. It allows for testing SQL database interactions without requiring a real database, making it easier to write unit tests for code that interacts with databases.

### API Documentation

- **[github.com/swaggo/swag](https://github.com/swaggo/swag)**
  - **Purpose:** A library that helps in generating Swagger documentation from your Go annotations. It streamlines the process of creating and maintaining API documentation by generating it from comments in your code.

- **[github.com/swaggo/gin-swagger](https://github.com/swaggo/gin-swagger)**
  - **Purpose:** A Gin middleware to automatically generate and serve Swagger documentation for your API. It helps in keeping your API documentation up-to-date and accessible.

- **[github.com/swaggo/files](https://github.com/swaggo/files)**
  - **Purpose:** A package for serving Swagger UI files. It is used in conjunction with `gin-swagger` to provide interactive API documentation.

## Authors

- **Erick Ortiz**
  - **Role:** Lead Developer
  - **Contact:** [ortiz.erick.67@gmail.com](mailto:ortiz.erick.67@gmail.com)
