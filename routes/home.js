exports.home = function (req, res) {
res.render('home');
}

//Login endpoint
exports.login = function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  // req.getConnection(function (err, connection) {
  //     connection.query('select * from users where username = ?', username, function (err, users) {
  //       if (err)
  //       return err;
  //       //console.log();
  //       if( password === users[0].password) {
  //         res.redirect("/products");
  //         }
  //         else{
  //           res.send('login failed');
  //         }
  //      })
  //
  //  })
if(username || password === "password" ) {
  req.session.user = username;
  req.session.admin = true;
  res.redirect('/');
}
else{
  res.send('login failed');
}

}

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
}
