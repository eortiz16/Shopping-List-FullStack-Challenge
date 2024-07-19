# Shopping List FullStack Challenge - Backend

## Database Schema

1. Users Table - This table will store user information.
```
id: Primary key, unique identifier for each user.
username: Unique username for the user.
email: Unique email for the user.
password: Hashed password for authentication.
created_at: Timestamp of when the user was created.
```

2. Lists Table - This table will store shopping lists, each associated with a user.
```
id: Primary key, unique identifier for each list.
user_id: Foreign key referencing the users table.
name: Name of the shopping list.
created_at: Timestamp of when the list was created.
```

3. Items Table - This table will store items within a shopping list.
```
id: Primary key, unique identifier for each item.
list_id: Foreign key referencing the lists table.
name: Name of the item.
description: Description of the item, up to 100 characters.
quantity: Quantity of the item.
purchased: Boolean indicating if the item has been purchased.
created_at: Timestamp of when the item was created.
```

## Explanation

1. Users Table:

Each user has a unique username and email.
The password will be stored as a hashed string for security.
created_at records the timestamp of user creation.

2. Lists Table:

Each list is associated with a specific user through the user_id foreign key.
The ON DELETE CASCADE ensures that if a user is deleted, all their lists are also deleted.
name allows for user-defined names for each list.

3. Items Table:

Each item is associated with a specific list through the list_id foreign key.
description is limited to 100 characters as specified.
quantity must be a positive integer.
purchased is a boolean that defaults to FALSE, indicating the item hasn't been purchased yet.
created_at records the timestamp of item creation.

## SQL Schema Definition

```
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

## What I have now

```
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    quantity INT CHECK (quantity > 0),
    purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Dependencies

1. gorilla/mux: A powerful URL router and dispatcher for Go.
2. lib/pq: A pure Go PostgreSQL driver.
3. GORM: is a powerful ORM library for Go that simplifies database interactions.