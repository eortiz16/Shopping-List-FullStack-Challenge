-- Create user and database
CREATE USER shopping_user WITH ENCRYPTED PASSWORD 'password';
CREATE DATABASE shopping_list WITH OWNER shopping_user;

-- Connect to the shopping_list database
\c shopping_list;

-- Create items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    quantity INT CHECK (quantity > 0),
    purchased BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
