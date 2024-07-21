
# Shopping List FullStack Challenge

## Introduction

Welcome to the Shopping List FullStack Challenge. This project is designed to demonstrate my skills in building a full-stack application from scratch. The application will manage a shopping list, allowing users to add, edit, and remove items. The project utilizes a Golang backend and a React frontend with TypeScript.

## Purpose

The purpose of this project is to showcase my ability to develop a complete full-stack application, including both the frontend and backend components.

## Project Overview

This project is a full-stack application designed to manage a shopping list. The application allows users to add, edit, and remove shopping items. The project is structured with a Golang backend and a React frontend using TypeScript.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker:** You will need Docker and Docker Compose installed to run the application.
- **Go:** Make sure you have Go installed to work with the backend.
- **Node.js and npm:** You will need Node.js and npm installed to work with the frontend.
- **PostgreSQL:** Ensure you have a PostgreSQL database set up.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Clone the Repository

```sh
git clone https://github.com/eortiz16/Shopping-List-FullStack-Challenge.git
cd shopping-list-fullstack
```

## Running the Application

### Using Docker Compose

The easiest way to run the application is using Docker Compose. This will start both the backend and the frontend along with a PostgreSQL database.

1. **Build and Start the Services:**

    ```sh
    docker-compose up --build
    ```

2. **Access the Application:**

    - Backend API: [http://localhost:8080/shopping-list-api/v1](http://localhost:8080/shopping-list-api/v1)
    - Frontend: [http://localhost:5001](http://localhost:5001)

### Running the Backend Locally

1. **Navigate to the Backend Directory:**

    ```sh
    cd backend
    ```

2. **Install Dependencies:**

    ```sh
    go mod tidy
    ```

3. **Run the Backend:**

    ```sh
    go run cmd/shoppinglist-api/main.go
    ```

### Running the Frontend Locally

1. **Navigate to the Frontend Directory:**

    ```sh
    cd frontend
    ```

2. **Install Dependencies:**

    ```sh
    npm install
    ```

3. **Run the Frontend:**

    ```sh
    npm start
    ```

## API Documentation

The backend includes Swagger documentation for exploring the API endpoints. You can access it at:

- **Swagger URL:** [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)

## Database Schema

### Simple Schema

The simple schema for the `items` table is:

```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    quantity INT CHECK (quantity > 0),
    purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Future Schema

For future extensibility, the following schema can be used:

```sql
-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- lists table
CREATE TABLE lists (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    list_id INT REFERENCES lists(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    quantity INT CHECK (quantity > 0),
    purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Dependencies

### Frontend Dependencies

- **React:** Declarative JavaScript library for building user interfaces.
- **React Router:** Navigational components for React applications.
- **Sass:** CSS preprocessor for styling.
- **Material UI:** React component library implementing Material Design.
- **Axios:** Promise-based HTTP client for the browser and Node.js.
- **TypeScript:** Typed superset of JavaScript.

### Backend Dependencies

- **Golang:** Open-source programming language for building efficient software.
  - **gin-gonic/gin:** High-performance HTTP web framework for Go.
  - **gin-contrib/cors:** Middleware for handling CORS in Gin.
  - **lib/pq:** PostgreSQL driver for Go's database/sql package.
  - **joho/godotenv:** Go port of Ruby's dotenv library for loading environment variables.
  - **stretchr/testify:** Toolkit for assertions and mocks in Go.
  - **DATA-DOG/go-sqlmock:** Mock SQL driver for testing database interactions.
  - **swaggo/swag:** Automatic API documentation generator for Go.
  - **swaggo/gin-swagger:** Gin middleware for Swagger API documentation.
  - **swaggo/files:** Swagger files for serving Swagger UI.

## Authors

- **Erick Ortiz**
  - **Role:** Lead Developer
  - **Contact:** [ortiz.erick.67@gmail.com](mailto:ortiz.erick.67@gmail.com)
