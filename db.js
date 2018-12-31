var sql = require("mssql");
var request;

var dbconfig = {
    user: 'coachlc',
    password: 'H3lpm3n0w!',
    server: 'xplatauctionlm3dbserver.database.windows.net',
    database: 'xPlatAuctionM3_db',
    encrypt: true
};

sql.connect(dbconfig, function (err) {
    if (err) console.log(err);
    request = new sql.Request();
});

exports.getPushEndpoints = function (callback) {
    request.query('select * from PushNotifEndPoints', function (err, result) {
        if (err) console.log(err)
        callback(result.recordsets[0]);
    });
}

exports.getPreferences = function (callback) {
    request.query('select * from snpref', function (err, result) {
        if (err) console.log(err)
        callback(result.recordsets[0]);
    });
}

var customerDb = {};
var id_inc = 0;

exports.listCustomers = function () {
    return customerDb;
};

exports.addCustomer = function (customer) {
    id_inc = id_inc + 1;
    customer.id = id_inc;
    customerDb[customer.id] = customer;
};

exports.getCustomerById = function (id) {
    return customerDb[id];
};

exports.deleteCustomer = function (id) {
    customerDb[id].remove();
};

exports.updateCustomer = function (customer) {
    customerDb[customer.id] = customer;
}
