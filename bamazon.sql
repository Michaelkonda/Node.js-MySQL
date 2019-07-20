DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;
USE bamazon_db;
 


CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Dunkin Donuts Original Blend Ground Coffee', 'Coffee', 5.98, 50),
		('Red Bull Energy Drink', 'Beverages', 3.25, 950),
		('Starbucks Sumatra Dark Roast Ground Coffee', 'Coffee', 6.99, 75),
		('Guinness Draught Beer', 'Beverages', 12.99, 100),
		('Mini Babybel Original Semisoft ', 'Cheese', 8.35, 120),
		('Pet Sematary, Stephen King', 'Books', 11.49, 10),
		('Apple AirPods with Charging Case', 'Electronics', 189.99, 15),
		('Sony PlayStation 4 1TB Slim Gaming Console', 'Electronics', 399.99, 5),
		('LeBron James Los Angeles Lakers Jersey', 'Clothing', 109.99, 25);