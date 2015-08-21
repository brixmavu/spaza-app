   var express = require('express');
   var exphbs = require('express-handlebars');

   var items = require('./productsQty');
   var popularProduct = require('./mostPopular');
   var popularCategory = require('./mostPopularCategory');
   var allCategories = require('./Categories');
   var leastPopularP = require('./leastPopular');
   var leastPopularC = require('./leastPopularCategory');

   var app = express();

   app.engine('handlebars', exphbs({
       defaultLayout: 'main'
   }));

   app.set('view engine', 'handlebars');

   app.use(express.static('.'));

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
       res.render('mostPopular', {
           products: productNames
       });
   });

   app.get('/popularC', function(req, res) {
       var productNames = popularCategory.mostPopularCategory('Nelisa Sales History.csv');
       res.render('mostPopular1', {
           products: productNames
       });
   });

   app.get('/Category', function(req, res) {
       var productNames = allCategories.categories('Nelisa Sales History.csv');
       res.render('productQty', {
           products: productNames
       });
   });

   app.get('/leastPopularP', function(req, res) {
       var productNames = leastPopularP.leastPopularProducts('Nelisa Sales History.csv');
       res.render('leastPopular1', {
           products: productNames
       });
   });

   app.get('/leastPopularC', function(req, res) {
       var productNames = leastPopularC.leastPopularCat('Nelisa Sales History.csv');
       res.render('leastPopular', {
           products: productNames
       });
   });

   //start the server
   var server = app.listen(3000, function() {

       var host = server.address().address;
       var port = server.address().port;

       console.log('Example app listening at http://%s:%s', host, port);

   });
