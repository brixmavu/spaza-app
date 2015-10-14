select products.products_name, sum(sales.qty) as qty
from sales
inner join products on sales.products_id = products.products_id
group by products.products_name
order by qty desc
limit 1