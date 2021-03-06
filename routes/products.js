exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT products.products_id, products.products_name, categories.category_name FROM products INNER JOIN categories ON categories.category_id = products.category_id ORDER BY products_id', [], function(err, results) {
            if (err) return next(err);
            res.render('products', {
                no_products: results.length === 0,
                products: results,
                user: req.session.user,
                route : req.path
            });
        });
    });
};


exports.showAdd = function(req, res) {
    req.getConnection(function(err, connection) {
        connection.query('SELECT * from categories', [], function(err, categories) {
            res.render('add', {
                categories: categories,
                user: req.session.user
            });
        });
    });
}

exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            products_name: input.products_name,
            category_id: input.category_id
        };
        connection.query('insert into products set ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/products');
        });
    });
};

exports.get = function(req, res, next) {
    var products_id = req.params.products_id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM products WHERE products_id = ?', [products_id], function(err, rows) {
            if (err) return next(err);
            res.render('edit', {
                page_title: "Edit Customers - Node.js",
                data: rows[0]
            });
        });
    });
};

exports.update = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var products_id = req.params.products_id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE products SET ? WHERE products_id = ?', [data, products_id], function(err, rows) {
            if (err) next(err);
            res.redirect('/products');
        });

    });
};

exports.delete = function(req, res, next) {
    var products_id = req.params.products_id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM products WHERE products_id = ?', [products_id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/products');
        });
    });
};

exports.mostPopularProduct = function(req, res, next) {
    var products_id = req.params.products_id;
    req.getConnection(function(err, connection) {
        connection.query('select products.products_name, sum(sales.qty) as qty from sales inner join products on sales.products_id = products.products_id group by products.products_name order by qty desc limit 1', [], function(err, results) {
            if (err) return next(err);
            res.render('mostPopularProduct',{
                    mostPopularProduct: results,
                    user: req.session.user
            });
        });
    });
};

exports.leastPopularProduct = function(req, res, next) {
    var products_id = req.params.products_id;
    req.getConnection(function(err, connection) {
        connection.query('select products.products_name, sum(sales.qty) as qty from sales inner join products on sales.products_id = products.products_id group by products.products_name order by qty asc limit 1', [], function(err, results) {
            if (err) return next(err);
            res.render('leastPopularProduct',{
                    leastPopularProduct: results,
                    user: req.session.user
            });
        });
    });
};
