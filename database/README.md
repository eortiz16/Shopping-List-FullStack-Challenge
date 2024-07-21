
# Shopping List FullStack Challenge - Database

## Introduction

The database design for the Shopping List FullStack Challenge is structured around simplicity and ease of implementation using PostgreSQL. Currently, it focuses on a single items table to manage items within the shopping list. While this design is straightforward, it lacks support for multiple users or lists. Below, we present the current schema and propose a more comprehensive schema for future extensibility.

## Simple Schema

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

### Simple Schema Functionality

#### 1. Get All Items

Query to retrieve all items from the `items` table:

```sql
SELECT * FROM items;
```

#### 2. Add an Item

Query to add a new item to the `items` table:

```sql
INSERT INTO items (name, description, quantity, purchased, created_at)
VALUES ('Item Name', 'Item Description', 1, FALSE, CURRENT_TIMESTAMP);
```

#### 3. Edit an Item

Query to edit an existing item in the `items` table:

```sql
UPDATE items
SET name = 'Updated Name', description = 'Updated Description', quantity = 2, purchased = TRUE
WHERE id = 1;
```

#### 4. Delete an Item

Query to delete an item from the `items` table:

```sql
DELETE FROM items
WHERE id = 1;
```

## Future Schema

### Future Schema Definition

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

## Authors

- **Erick Ortiz**
  - **Role:** Database Designer
  - **Contact:** [email@example.com](mailto:email@example.com)
