exports.showSales = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * FROM sales, products WHERE sales.products_id = products.products_id', [], function(err, results) {
                        res.render('sales', {
                no_sales: results.length === 0,
                sales: results,
                user: req.session.user,
                route : req.path

            });
        });
    });
};

exports.showAddSales = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * FROM products', [], function(err, products) {
            /*console.log("Products", products);*/
            if (err) return next(err);
            res.render('addSales', {
                products: products,
                user: req.session.user
            });
        });
    });
};

exports.addSales = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            products_id: input.products_id,
            sale_date: input.sale_date,
            sales_price: input.sales_price,
            qty: input.qty,
        };
        connection.query('INSERT INTO sales SET ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};

exports.getSales = function(req, res, next) {
    var sales_id = req.params.sales_id;
    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM sales WHERE sales_id = ?', [sales_id], function(err, rows) {
            connection.query('SELECT * FROM products', [], function(err, results){
            if (err) return next(err);
            res.render('editSales', {
                page_title: "Edit Customers - Node.js",
                data: rows[0],
                products: results
            });
            });
        });
    });
};

exports.updateSales = function(req, res, next) {

    var data = JSON.parse(JSON.stringify(req.body));
    var sales_id = req.params.sales_id;
    req.getConnection(function(err, connection) {
        connection.query('UPDATE sales SET ? WHERE sales_id = ?', [data, sales_id], function(err, rows) {
            if (err) next(err);
            res.redirect('/sales');
        });
    });
};

exports.delete = function(req, res, next) {
    var sales_id = req.params.sales_id;
    req.getConnection(function(err, connection) {
        connection.query('DELETE FROM sales WHERE sales_id = ?', [sales_id], function(err, rows) {
            if (err) return next(err);
            res.redirect('/sales');
        });
    });
};
