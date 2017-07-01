var mongodb = require('mongodb');
var Grid = require('gridfs-stream');
var config = require('../../globals');

var MongoClient = mongodb.MongoClient;
if (config.dbUsername != '')
    var mongoUrl = 'mongodb://' + config.dbUsername + ":" + config.dbPassword + "@" + config.dbIp + '/' + config.dbName;
else
    var mongoUrl = 'mongodb://' + config.dbIp + '/' + config.dbName;
//var mongoUrl = 'mongodb://' + config.dbUsername + ":" + config.dbPassword + "@" + config.dbIp + '/' + config.dbName;
console.log('mongoUrl: ' + mongoUrl);

var dbObj;
var option = {
    server: {
        poolSize: config.dbPoolSize
    }
};

function initPool(callback) {
    MongoClient.connect(mongoUrl, option, function(err, db) {
        if (err) {
            callback(err, null);
        } else if (callback && typeof(callback) == 'function') {
            dbObj = db;
            callback(null, dbObj);
        }
    });
}

var MongoPool = {
    initPool: initPool,

    getInstance: function(callback) {
        if (!dbObj) {
            initPool(callback)
        } else {
            // console.log("mongo DB instance already exist.");
            if (callback && typeof(callback) == 'function') {
                callback(null, dbObj);
            }
        }
    },

    getGfsInstance: function(callback) {
        if (!dbObj) {
            initPool(function(err, db) {
                if (!err) {
                    callback(null, Grid(db, mongodb));
                } else {
                    callback(err, null);
                }
            });
        } else {
            if (callback && typeof(callback) == 'function') {
                callback(null, Grid(dbObj, mongodb));
            }
        }
    }
}

module.exports = MongoPool;
