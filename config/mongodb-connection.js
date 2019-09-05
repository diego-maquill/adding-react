/* database configuration */
//var ObjectID = mongodb.ObjectID;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const assert = require('assert');

let MONGOLAB_URI = 'mongodb://heroku_sl83bd7s:Panzonito8@ds161048.mlab.com:61048/heroku_sl83bd7s';

//let fullMongoUrl = process.env.MONGOLAB_URI;
let _connection = undefined;
var db;

let connectDb = async () => {
    if (!_connection) {
        _connection = await MongoClient.connect(process.env.MONGOLAB_URI || "mongodb://localhost:27017/fast-and-fresh", {
            server: {
                auto_reconnect: true
            }
        })
        return _connection;
        // function (err, client) {
        /*    if (err) {
               console.log(err);
               //  process.exit(1);
           }
           // Save database object from the callback for reuse.
           db = client.db();
           console.log("Database connection ready");
           return db; */

        // Initialize the app.
        //}
        /*
        .then((db) => {
            return db;
        });*/
    } else {
        return _connection;
    }
};

/* let connectDb = () => {

    if (!_connection) {
        _connection = MongoClient.connect(fullMongoUrl, {
                server: {
                    auto_reconnect: true
                }
            })
            .then((err, db) => {
                return db;
            });
    }

    return _connection;
};
 */
module.exports = connectDb;