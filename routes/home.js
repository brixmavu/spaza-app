






exports.login = function(req, res, next){
					// req.getConnection(function(error,connection) {
					//
					// 			var input = JSON.parse(JSON.stringify(req.body));
					// 			var username = input.username;
					// 			var password = input.password;
					// 			if (error) {
					// 				return next(error);
					// 			}
					//
					// 			connection.query('select * from members where username = ?', members, function (error, members) {
					// 					var member = members[0];
					// 					console.log(member);
					// 			});
					// });
	res.render('home');
}
