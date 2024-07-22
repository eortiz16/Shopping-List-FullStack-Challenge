
# Shopping List FullStack Challenge

## Introduction

Welcome to the Shopping List FullStack Challenge. This project is designed to demonstrate my skills in building a full-stack application from scratch. The application will manage a shopping list, allowing users to add, edit, and remove items. The project utilizes a Golang backend and a React frontend with TypeScript.

This project was developed and tested on the latest macOS. While the provided instructions should work on other operating systems, I am unable to provide specific guidance for non-macOS environments at this time. Users on other platforms may need to make adjustments based on their operating system.

## Purpose

The purpose of this project is to showcase my ability to develop a complete full-stack application, including both the frontend and backend components.

## Project Overview

This project is a full-stack application designed to manage a shopping list. The application allows users to add, edit, and remove shopping items. The project is structured with a Golang backend and a React frontend using TypeScript.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Docker:** You will need Docker and Docker Compose installed to run the application.
    - [Install Docker](https://docs.docker.com/engine/install/)
- **Go:** Make sure you have Go installed to work with the backend.
    - [Install Go](https://go.dev/doc/install)
- **Node.js and npm:** You will need Node.js and npm installed to work with the frontend.
    - [Install Node.js](https://nodejs.org/en)
- **PostgreSQL:** Ensure you have a PostgreSQL database set up.
    - [Install PostgreSQL](https://www.postgresql.org/download/)

## Notes on Secrets and Environment Files

To facilitate the deployment process and ensure a seamless setup experience, all secrets and environment variables have been included in the provided .env files within this repository. This is intentional and not an oversight. It allows you to quickly get the application up and running after cloning the repository.

Please ensure to secure these files appropriately if deploying in a production environment.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Clone the Repository

```sh
git clone https://github.com/eortiz16/Shopping-List-FullStack-Challenge.git
cd Shopping-List-FullStack-Challenge
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

### Setting up PostgreSQL Database Locally

1. **Install PostgreSQL**:
   - Download and install PostgreSQL from the [PostgreSQL Downloads](https://www.postgresql.org/download/).

2. **Start PostgreSQL Service**:
   - For macOS:
     ```sh
     brew services start postgresql
     ```

3. **Create Database and User**:
   - Access the PostgreSQL command line interface:
     ```sh
     psql
     ```
   - Create the `shopping_list` database:
     ```sql
     CREATE DATABASE shopping_list;
     ```
   - Create the `shopping_user` user with the password `password`:
     ```sql
     CREATE USER shopping_user WITH ENCRYPTED PASSWORD 'password';
     ```
   - Grant all privileges on the `shopping_list` database to `shopping_user`:
     ```sql
     GRANT ALL PRIVILEGES ON DATABASE shopping_list TO shopping_user;
     ```
   - Exit the PostgreSQL command line interface:
     ```sql
     \q
     ```
   - Exit from the PostgreSQL user:
     ```sh
     exit
     ```

4. **Create `items` Table**:
   - Connect to the `shopping_list` database using the `shopping_user` user:
     ```sh
     psql -U shopping_user -d shopping_list -W
     ```
   - Enter the password `password` when prompted.
   - Create the `items` table:
     ```sql
     CREATE TABLE IF NOT EXISTS items (
         id SERIAL PRIMARY KEY,
         name VARCHAR(100) NOT NULL,
         description VARCHAR(100),
         quantity INT CHECK (quantity > 0),
         purchased BOOLEAN DEFAULT FALSE,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```
   - Exit the PostgreSQL command line interface:
     ```sql
     \q
     ```

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
