   var express = require('express');
   var exphbs = require('express-handlebars');

   var items = require('./productsQty');
   var popularProduct = require('./mostPopular');
   var popularCategory = require('./mostPopularCategory');


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

   app.get('/allProducts', function(req, res) {
       var productNames = items.productsSold('Nelisa Sales History.csv');
       res.render('productQty', {
           products: productNames
       });
   });

   app.get('/popularP', function(req, res) {
       var productNames = popularProduct.popularProducts('Nelisa Sales History.csv');
       res.render('mostPopularP', {
           products: productNames
       });
   });

   app.get('/popularC', function(req, res) {
       var productNames = popularCategory.mostPopularCategory('Nelisa Sales History.csv');
       res.render('mostPopularC', {
           products: productNames
       });
   });



    //start the server
   var server = app.listen(3000, function() {

       var host = server.address().address;
       var port = server.address().port;

       console.log('Example app listening at http://%s:%s', host, port);

   });