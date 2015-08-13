   var express = require('express');
   var exphbs = require('express-handlebars');

   var app = express();

   app.engine('handlebars', exphbs({
       defaultLayout: 'main'
   }));
   app.set('view engine', 'handlebars');


   app.use(express.static('public'));

    // create a route
   app.get('/', function(req, res) {
       res.render('home');
   });

    //start the server
   var server = app.listen(3000, function() {

       var host = server.address().address;
       var port = server.address().port;

       console.log('Example app listening at http://%s:%s', host, port);

   });