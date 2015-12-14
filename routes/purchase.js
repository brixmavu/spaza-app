exports.showPurchase = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('select * from purchases', [], function(err, results) {
            if (err) return next(err);
            res.render('purchase', {
                no_purchase: results.length === 0,
                purchase: results,
            });
        });
    });
};