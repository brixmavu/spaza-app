exports.search = function (req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) {
      return next(err);
    };
    var searchItem = req.body.searchItem;
    searchItem = "%" + searchItem + "%";
    connection.query("select products_name, category_name from categories, products where categories.category_id = products.category_id AND (products_name LIKE ? OR category_name LIKE ?)",[searchItem, searchItem], function (err, results) {
       if(err){
         return next(err);
       };

       res.render('search', {
         products: results,
         user: req.session.user
       });
    });
  });
};
