INSERT INTO sales (products_id, sale_date, sales_price, qty)
SELECT products.products_id, sales_csv.date, sales_csv.sales_price, sales_csv.no_sold
FROM sales_csv
INNER JOIN products
ON products.products_name = sales_csv.stock_item;