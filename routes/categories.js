exports.showCategories = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) next(err);
		connection.query('select * from categories order by category_id', [], function(err, results){
			res.render('categories', {
				no_categories : results.length===0,
				categories : results
			});
		});
	});
};

exports.showAddCategories = function(req, res){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('select * from categories', [], function(err, categories){
			if(err) return next(err);
			res.render('addCategories', {
				categories : categories
			});
		});
	});
};

exports.addCategories = function(req, res, next){
	req.getConnection(function(err,connection){
		if(err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			category_id : input.category_id,
			category_name : input.category_name
		};
		connection.query('insert into categories set ?', data, function(err, results) {
  			if (err) return next(err);
			res.redirect('/categories');
		});
	});
};

exports.getCategories = function(req, res, next){
	var category_id = req.params.category_id;
	req.getConnection(function(err, connection){
		connection.query('select * from categories where category_id = ?', [category_id], function(err, rows){
			if(err) return next(err);
			res.render('editCategories', {page_title:'Edit categories - Node.js', data : rows[0]});
		});
	});
};

exports.updateCategories = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
  	var category_id = req.params.category_id;
  	req.getConnection(function(err, connection){
		connection.query('update categories SET ? where category_id = ?', [data, category_id], function(err, rows){
    		if (err) next(err);
          	res.redirect('/categories');
    	});
	});
};

exports.delete = function(req, res, next){
	var category_id = req.params.category_id;
	req.getConnection(function(err, connection){
		connection.query('delete from categories where category_id = ?', [category_id], function(err,rows){
			if(err) return next(err);
			res.redirect('/categories');
		});
	});
};

exports.categoriesPopularity = function(req, res, next){
	var categories_id = req.params.categories_id;
	req.getConnection(function(err, connection){
		connection.query( 'select categories.category_name, sum(sales.qty) as qty from sales inner join products on sales.products_id = products.products_id inner join categories on products.category_id = categories.category_id group by categories.category_name order by qty desc', [] , function(err, results) {
			if(err) return next(err);
			res.render('categoriesPopularity', {
				categoriesPopularity: results
			});
		});
	});
};