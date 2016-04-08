exports.showPurchase = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select * from purchases, products where purchases.products_id = products.products_id ', [], function(err, results) {
            if (err) return next(err);
            res.render('purchase', {
                no_purchase: results.length === 0,
                purchase: results,
                user: req.session.user,
                route : req.path
            });
        });
    });
};

exports.showAddPurchase = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select * from products', [], function(err, products) {
            connection.query('select * from suppliers', [], function(err, suppliers){
            if (err) return next(err);
            res.render('addPurchase', {
                products: products,
                suppliers: suppliers,
                user: req.session.user
            });
        });
        });
    });
};

exports.addPurchase = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            purchases_id : input.purchases_id,
            qty: input.qty,
            cost_price: input.cost_price,
            date: input.date,
            suppliers_id: input.suppliers_id,
            products_id: input.products_id
        };
        connection.query('insert into purchase SET ?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/purchase');
        });
    });
};

exports.getPurchase = function(req, res, next){
    var purchases_id = req.params.purchases_id;
    req.getConnection(function(err, connection){
        connection.query('select * from purchases where purchases_id = ?', [purchases_id], function(err,rows){
            connection.query('select * from products', [], function(err, results){
                connection.query('select * from suppliers', [], function(err, result){
                    if(err) return next(err);
                    res.render('editPurchases',{
                        page_title:"Edit Customers - Node.js",
                        data : rows[0],
                        products : results,
                        suppliers : result,
                    });
                });
            });
        });
    });
};

exports.updatePurchase = function(req, res, next){

    var data = JSON.parse(JSON.stringify(req.body));
    var purchase_id = req.params.purchase_id;
    req.getConnection(function(err, connection){
            connection.query('update purchases set ? where purchase_id = ?', [data, purchases_id], function(err, rows){
                if (err) next(err);
                res.redirect('/purchase');
            });

    });
};

exports.delete = function(req, res, next){
    var purchases_id = req.params.purchases_id;
    req.getConnection(function(err, connection){
        connection.query('delete from purchases where purchase_id = ?', [purchases_id], function(err,rows){
            if(err) return next(err);
            res.redirect('/purchase');
        });
    });
};
