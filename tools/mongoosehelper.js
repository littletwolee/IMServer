/**
 * Created by lee on 9/23/15.
 */
var mongoose = require( 'mongoose'),
    fs = require("fs");
// Build the connection string
var JsonObj=JSON.parse(fs.readFileSync('./config.json'));
var dbURI = 'mongodb://'+JsonObj.mongoserver.username+':'+JsonObj.mongoserver.password+'@'+JsonObj.mongoserver.host+':'+JsonObj.mongoserver.port+'/'+JsonObj.mongoserver.dbname;
//var dbURI = 'mongodb://littletwolee:LIhui0521@ds051863.mongolab.coms:51863/appharbor_l9r3h5xr';
// Create the database connection
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});