'use strict';
//Module dependencies.
var express = require('express'),
    exphbs = require('express-handlebars'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    home = require('./routes/home'),
    products = require('./routes/products'),
    sales = require('./routes/sales'),
    purchase = require('./routes/purchase');

var app = express();

var dbOptions = {
    host: 'localhost',
    user: 'root',
    password: 'brix2015',
    port: 3306,
    database: 'spaza_app'
};

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
app.get('/', home.home );
app.get('/products', products.show);
app.get('/products/edit/:products_id', products.get);
app.post('/products/update/:products_id', products.update);
app.get('/products/add', products.showAdd);
app.post('/products/add', products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:products_id', products.delete);



app.use(errorHandler);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3001;

//start everything up
app.listen(portNumber, function() {
    console.log('Create, Read, Update, and Delete (CRUD) example server listening on:', portNumber);
});
