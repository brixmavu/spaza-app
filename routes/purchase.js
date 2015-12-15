exports.showPurchase = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select * from purchases, products WHERE purchases.products_id = products.products_id order by purchases_id', [], function(err, results) {
            if (err) return next(err);
            res.render('purchase', {
                no_purchase: results.length === 0,
                purchase: results,
            });
        });
    });
};

exports.showAddPurchases = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * FROM products', [], function(err, products) {
            if (err) return next(err);
            res.render('addPurchases', {
                products: products
            });
        });
    });
};

exports.addPurchases = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            products_id: input.products_id,
            date: input.date,
            cost_price: input.cost_price,
            qty: input.qty,
            //suppliers_id: input.suppliers_id
        };
        connection.query('INSERT INTO purchases SET ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/purchases');
        });
    });
};
