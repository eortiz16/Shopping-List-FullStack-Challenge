
# Shopping List FullStack Challenge - Database

## Introduction

The current design of the database has been chosen for simplicity and ease of implementation. It focuses on a single `items` table to store the items in the shopping list. However, this design is not extensible and does not support multiple users or lists. To provide a glimpse of a future state, we present a more detailed and extensible schema that includes users, lists, and items. For now, we will primarily focus on the `items` table as shown below:

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

## Simple Schema Functionality

### 1. Get All Items

Query to retrieve all items from the `items` table:

```sql
SELECT * FROM items;
```

### 2. Add an Item

Query to add a new item to the `items` table:

```sql
INSERT INTO items (name, description, quantity, purchased, created_at)
VALUES ('Item Name', 'Item Description', 1, FALSE, CURRENT_TIMESTAMP);
```

### 3. Edit an Item

Query to edit an existing item in the `items` table:

```sql
UPDATE items
SET name = 'Updated Name', description = 'Updated Description', quantity = 2, purchased = TRUE
WHERE id = 1;
```

### 4. Delete an Item

Query to delete an item from the `items` table:

```sql
DELETE FROM items
WHERE id = 1;
```

## Future State: Database Schema

### 1. Users Table

This table will store user information.

```text
id: Primary key, unique identifier for each user.
username: Unique username for the user.
email: Unique email for the user.
password: Hashed password for authentication.
created_at: Timestamp of when the user was created.
```

### 2. Lists Table

This table will store shopping lists, each associated with a user.

```text
id: Primary key, unique identifier for each list.
user_id: Foreign key referencing the users table.
name: Name of the shopping list.
created_at: Timestamp of when the list was created.
```

### 3. Items Table

This table will store items within a shopping list.

```text
id: Primary key, unique identifier for each item.
list_id: Foreign key referencing the lists table.
name: Name of the item.
description: Description of the item, up to 100 characters.
quantity: Quantity of the item.
purchased: Boolean indicating if the item has been purchased.
created_at: Timestamp of when the item was created.
```

## SQL Schema Definition

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
