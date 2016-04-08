exports.search = function (req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) {
      return next(err);
    };
    var searchItem = req.param.searchItem;
    searchItem = "%" + searchItem + "%";

    connection.query("select products_id, products_name from products where products_name like ?",[searchItem], function (err, results) {
       if(err){
         return next(err);
       };
       res.render("search", {
         products: results,
         user: req.session.user
       });
    });
  });
};
