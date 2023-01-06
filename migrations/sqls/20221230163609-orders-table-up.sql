-- Create Orders table schema

CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(64) NOT NULL,
    -- one to many relationship -> one product to many users
    user_id bigint REFERENCES users(id) on delete cascade
);