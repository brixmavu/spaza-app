'use strict';
//Module dependencies.
var express = require('express'),
    exphbs = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = ('require express-session'),
    home = require('./routes/home'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    suppliers = require('./routes/suppliers'),
    categories = require('./routes/categories'),
    purchase = require('./routes/purchase');

var app = express();

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'brix2015',
    port: 3306,
    database: 'spaza_app'
};

// app.use(session({
//     secret: '2C44-4D44-WppQ38S',
//     resave: true,
//     saveUninitialized: true
// }));
//
// // Authentication and Authorization Middleware
// var auth = function(req, res, next) {
//   if (req.session && req.session.user === "nelisa" && req.session.admin)
//     return next();
//   else
//     return res.sendStatus(401);
// };


//setup template handlebars as the template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
        extended: false
    }))
    // parse application/json
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

//setup the handlers
app.get('/', home.login );
app.get('/products', products.show);
app.get('/products/edit/:products_id', products.get);
app.post('/products/update/:products_id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:products_id', products.delete);
app.get('/products/mostPopularProduct', products.mostPopularProduct);
app.get('/products/leastPopularProduct', products.leastPopularProduct);

app.get('/sales', sales.showSales);
app.get('/sales/edit/:sales_id', sales.getSales);
app.post('/sales/update/:sales_id', sales.updateSales);
app.get('/sales/add', sales.showAddSales);
app.post('/sales/add', sales.addSales);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/sales/delete/:sales_id', sales.delete);

app.get('/categories', categories.showCategories);
app.get('/categories/addCategories', categories.showAddCategories);
app.post('/categories/addCategories', categories.addCategories);
app.get('/categories/editCategories/:category_id', categories.getCategories);
app.post('/categories/updateCategories/:category_id', categories.updateCategories);
app.get('/categories/delete/:category_id', categories.delete);
app.get('/categories/mostPopularCategory', categories.mostPopularCategory);
app.get('/categories/leastPopularCategory', categories.leastPopularCategory)

app.get('/suppliers', suppliers.showSuppliers);
app.get('/suppliers/addSuppliers', suppliers.showAddSuppliers);
app.post('/suppliers/addSuppliers', suppliers.addSuppliers);
app.get('/suppliers/updateSuppliers/:suppliers_id', suppliers.getSuppliers);
app.post('/suppliers/updateSuppliers/:suppliers_id', suppliers.updateSuppliers);
app.get('/suppliers/delete/:suppliers_id', suppliers.delete);

app.get('/purchases', purchase.showPurchase);
app.get('/purchases/addPurchases', purchase.showAddPurchase);
app.post('/purchases/addPurchases', purchase.addPurchase);
app.get('/purchases/updatePurchases/:purchases_id', purchase.getPurchase);
app.post('/purchases/updatePurchases/:purchases_id', purchase.updatePurchase);
app.get('/purchases/delete/:purchases_id', purchase.delete);

app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3001;

//start everything up
app.listen(portNumber, function() {
    console.log('Create, Read, Update, and Delete (CRUD) server listening on:', portNumber);
});
