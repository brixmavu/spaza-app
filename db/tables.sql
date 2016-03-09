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
	qty int,
	cost_price int,
	date date NOT NULL,
	suppliers_id int NOT NULL,
	products_id int NOT NULL,
	FOREIGN KEY (products_id) REFERENCES products(products_id),
	FOREIGN KEY (suppliers_id) REFERENCES suppliers(suppliers_id)
	);

	DROP TABLE IF EXISTS sales;
	CREATE TABLE sales (
	sales_id int NOT NULL auto_increment,
	sale_date date,
	PRIMARY KEY(sales_id),
	qty int(30),
	sales_price int(30),
	products_id int(30) NOT NULL
	);

	DROP TABLE IF EXISTS members;
	CREATE TABLE members (
		members_id int(11) NOT NULL AUTO_INCREMENT ,
		username varchar(30) NOT NULL ,
		email varchar(50) NOT NULL ,
		password varchar(128) NOT NULL,
		PRIMARY KEY (members_id)
	);
