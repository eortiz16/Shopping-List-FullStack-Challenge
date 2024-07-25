-- Create the items table in the shopping_list database
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100),
    quantity INT CHECK (quantity > 0),
    purchased BOOLEAN DEFAULT FALSE,
    due_dat TIMESTAMP
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
