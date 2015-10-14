select categories.category_name, sum(sales.qty) as qty
from sales
inner join products on sales.products_id = products.products_id
inner join categories on products.category_id = categories.category_id
group by categories.category_name
order by qty asc
limit 0, 1