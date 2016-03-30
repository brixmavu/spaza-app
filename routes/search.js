exports.search = function (req, res) {
  var key = "%"+req.query.key+ "%";
  console.log(key);
  connection.query('SELECT products_name from products where products_name like?  ' , key,
      function(err, rows, fields) {
        if (err) throw err;
        var data=[];
        for(i=0;i<rows.length;i++)
        {
          data.push(rows[i].products_name);
        }
    res.end(JSON.stringify(data));
  });
}
