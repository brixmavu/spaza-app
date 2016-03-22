var bcrypt = require('bcryptjs');


exports.home = function (req, res) {
res.render('home');
}


//aadding users
exports.user = function (req, res, next) {
  req.getConnection(function () {
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      username : input.username,
      password : input.password,
      role: "user"
    };
    var hash = bcrypt.hashSync(input.password, 10);
  });

}

//Login endpoint
exports.login = function(req, res, next){
	req.getConnection(function(err, connection){
		var input = JSON.parse(JSON.stringify(req.body));
		var username = input.username;

		if(err){
			return next(err);
		};
		connection.query('select * from users where username = ?', username, function(err, users){
			if(users[0] === undefined){
				//return res.redirect('/');
        return res.sendStatus(401);
			};

			var user = users[0];
			bcrypt.compareSync(input.password, user.password, function(err, pass){
				if(err){
					next(err)
				};

				if(pass){
					req.session.user = username;
					req.session.role = user.role;
					return res.redirect('/');
				}
				else {
					//res.redirect('/');
          return res.sendStatus(401);
				};
			});
		});
	});
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect('/');
}
