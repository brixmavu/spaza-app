INSERT INTO suppliers(suppliers_name) 
SELECT DISTINCT shop 
FROM stock_purchases_csv;