	DROP TABLE IF EXISTS categories;
	CREATE TABLE categories (
	category_id int NOT NULL auto_increment,
	category_name varchar(30),
	PRIMARY KEY(category_id),
	CONSTRAINT uc_category_name  UNIQUE (category_name)  
	);
	
	DROP TABLE IF EXISTS suppliers;
	CREATE TABLE suppliers (
	suppliers_id int NOT NULL auto_increment,
	suppliers_name varchar(30),
	PRIMARY KEY(suppliers_id),
	CONSTRAINT uc_suppliers_name UNIQUE (suppliers_name)
	);
	
	DROP TABLE IF EXISTS products;
	CREATE TABLE products (
	products_id int NOT NULL auto_increment,
	category_id int NOT NULL,
	products_name varchar(30),
	PRIMARY KEY(products_id),
	FOREIGN KEY (category_id) REFERENCES categories(category_id)
	);
	
	DROP TABLE IF EXISTS purchases;
	CREATE TABLE purchases (
	purchases_id int NOT NULL auto_increment,
	PRIMARY KEY(purchases_id),
	purchases_name varchar(30),
	qty int,
	cost_price int,
	products_id int NOT NULL,
	FOREIGN KEY (products_id) REFERENCES products(products_id)
	);
	
	DROP TABLE IF EXISTS sales;
	CREATE TABLE sales (
	sales_id int NOT NULL auto_increment,
	sales_name varchar(30),
	PRIMARY KEY(sales_id),
	qty int,
	sales_price int,
	products_id int NOT NULL,
	FOREIGN KEY (products_id) REFERENCES products(products_id)
	);