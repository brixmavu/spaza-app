exports.showSuppliers = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('SELECT * FROM suppliers ORDER BY suppliers_id', [], function(err, results){
			res.render('suppliers',{
				no_suppliers : results.length===0,
				suppliers : results
			});
		});
	});
};

exports.showAddSuppliers = function(req, res){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		connection.query('SELECT * FROM suppliers', [], function(err, suppliers){
			if(err) return next(err);
			res.render('addSuppliers', {
				suppliers : suppliers
			});
		});
	});
};

exports.addSuppliers = function(req, res, next){
	req.getConnection(function(err, connection){
		if(err) return next(err);
		var input = JSON.parse(JSON.stringify(req.body));
		var data = {
			suppliers_name :input.suppliers_name
		};
		connection.query('INSERT INTO suppliers SET ?', data, function(err, results){
			if(err) return next(err);
			res.redirect('/suppliers');
		});
	});
};
exports.getSuppliers = function(req, res, next){
	var suppliers_id = req.params.suppliers_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM suppliers WHERE suppliers_id = ?', [suppliers_id], function(err, rows){
			if(err) return next(err);
			res.render('editSuppliers', {page_title:'Edit Categories - Node.js', data : rows[0]});
		});
	});
};

exports.updateSuppliers = function(req, res, next){
	var data = JSON.parse(JSON.stringify(req.body));
  	var suppliers_id = req.params.suppliers_id;
  	req.getConnection(function(err, connection){
		connection.query('UPDATE suppliers SET ? WHERE suppliers_id = ?', [data, suppliers_id], function(err, rows){
    		if (err) next(err);
          	res.redirect('/suppliers');
    	});
	});
};

exports.delete = function(req, res, next){
	var suppliers_id = req.params.suppliers_id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM suppliers WHERE suppliers_id = ?', [suppliers_id], function(err, rows){
			if(err) return next(err);
			res.redirect('/suppliers');
		});
	});
};