exports.home = function (req, res) {
res.render('home');
}

//Login endpoint
exports.login = function(req, res){
  var username = "brix";
  var password = "password";

if(req.body.username === username || req.body.password === password ) {
  req.session.user = username;
  req.session.admin = true;
  res.redirect('/');
}
else{
  res.send('login failed');
}

};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
}
