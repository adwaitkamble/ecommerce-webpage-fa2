
-- Create database
CREATE DATABASE IF NOT EXISTS ecommerce_db;
USE ecommerce_db;

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id VARCHAR(10) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample admin data
INSERT INTO admins (admin_id, first_name, last_name, email)
VALUES 
  ('ADM001', 'John', 'Doe', 'john.doe@example.com'),
  ('ADM002', 'Jane', 'Smith', 'jane.smith@example.com');

-- Consumers table
CREATE TABLE IF NOT EXISTS consumers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  consumer_id VARCHAR(10) NOT NULL UNIQUE,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  address VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample consumer data
INSERT INTO consumers (consumer_id, first_name, last_name, email, address, phone)
VALUES 
  ('CON001', 'Alice', 'Johnson', 'alice@example.com', '123 Main St', '555-1234'),
  ('CON002', 'Bob', 'Williams', 'bob@example.com', '456 Oak Ave', '555-5678');

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  supplier_id VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample product data
INSERT INTO products (product_id, name, description, category, price, stock_quantity, supplier_id)
VALUES 
  ('PRD001', 'Smartphone X', 'Latest smartphone with advanced features', 'Electronics', 699.99, 50, 'SUP001'),
  ('PRD002', 'Laptop Pro', 'High-performance laptop for professionals', 'Electronics', 1299.99, 25, 'SUP001'),
  ('PRD003', 'Wireless Headphones', 'Noise-cancelling wireless headphones', 'Electronics', 199.99, 100, 'SUP002'),
  ('PRD004', 'Coffee Maker', 'Automatic coffee maker with timer', 'Kitchen', 89.99, 30, 'SUP003');

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id VARCHAR(10) NOT NULL UNIQUE,
  consumer_id VARCHAR(10) NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address VARCHAR(255) NOT NULL
);

-- Insert sample order data
INSERT INTO orders (order_id, consumer_id, status, total_amount, shipping_address)
VALUES 
  ('ORD001', 'CON001', 'Processing', 699.99, '123 Main St'),
  ('ORD002', 'CON001', 'Shipped', 199.99, '123 Main St'),
  ('ORD003', 'CON002', 'Delivered', 1299.99, '456 Oak Ave'),
  ('ORD004', 'CON002', 'Pending', 89.99, '456 Oak Ave');

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  supplier_id VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  address VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample supplier data
INSERT INTO suppliers (supplier_id, name, contact_person, email, phone, address)
VALUES 
  ('SUP001', 'Tech Innovations Inc.', 'Mark Wilson', 'mark@techinnovations.com', '555-9876', '789 Tech Blvd'),
  ('SUP002', 'Audio Solutions', 'Sarah Brown', 'sarah@audiosolutions.com', '555-6543', '321 Sound Ave'),
  ('SUP003', 'Home Appliances Ltd', 'David Miller', 'david@homeappliances.com', '555-3210', '654 Appliance St');
