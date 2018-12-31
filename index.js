var express = require('express'),
    path = require('path'),
    home = require('./routes/home.js'),
    customer = require('./routes/customer.js');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, '/pictures')}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', home.index);
app.get('/contact', home.contact);
app.get('/customer', customer.index);
app.get('/customer/create', customer.create);
app.get('/customer/details/:id', customer.details);
app.get('/customer/picture/:id', customer.picture);
app.post('/customer/create', customer.createCustomer);
app.get('/customer/edit/:id', customer.edit);
app.post('/customer/edit/:id', customer.editCustomer);
app.delete('/customer/edit/:id', customer.delete);

app.locals.clock = { datetime: new Date().toUTCString()};

//var sql = require("mssql");
//var request;

//var dbconfig = {
//    user: 'coachlc',
//    password: 'H3lpm3n0w!',
//    server: 'xplatauctionlm3dbserver.database.windows.net',
//    database: 'xPlatAuctionM3_db',
//    encrypt: true
//};

//sql.connect(dbconfig, function (err) {
//    if (err) console.log(err);
//    request = new sql.Request();
//});

//app.get('/getKey', function (req, res) {
//    request.query('select * from PushNotifEndPoints', function (err, recordset) {
//        if (err) console.log(err)
//        res.send(recordset);
//    });

//});

app.listen(3000);