-- Create Order Products (JOIN) table schema

CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    -- Many to many relationships -> many orders have many products
    order_id bigint REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint REFERENCES products(id) ON DELETE CASCADE
);