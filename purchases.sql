INSERT INTO purchases (products_id, suppliers_id, date, cost, quantity)
SELECT products.products_id, suppliers.suppliers_id, stock_purchases_csv.date, stock_purchases_csv.cost, stock_purchases_csv.quantity
FROM stock_purchases_csv
INNER JOIN products
ON products.products_name = stock_purchases_csv.item
INNER JOIN suppliers
ON suppliers.suppliers_name = stock_purchases_csv.shop

