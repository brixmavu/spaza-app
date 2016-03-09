exports.login = function(req, res){
	res.render('home');
}

/*
// Login endpoint
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');
  } else if(req.query.username === "nelisa" || req.query.password === "nelisapassword") {
    req.session.user = "nelisa";
    req.session.admin = true;
    res.send("login success!");
  }
});

// Logout endpoint
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
*/
