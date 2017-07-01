var Promise = require('bluebird');
var mongoConnectionPool = require('./mongoDBConnection');


var insert = function(collectionName, data) {
    return new Promise(function(resolve, reject) {
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                if (Array.isArray(data)) {
                    db.collection(collectionName).insertMany(data, { w: 1 }, function(error, result) {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                } else {
                    reject(new Error("Expected data type is array for second argument."));
                }
            }
        });
    });
}

var read = function(collectionName, criteria) {
    return new Promise(function(resolve, reject) {
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).find(criteria).toArray(function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

var readlimit = function(collectionName, criteria, begin, records) {
    return new Promise(function(resolve, reject) {
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                console.log('entity..'+begin);
                console.log('records..'+records);
                db.collection(collectionName).find(criteria).limit(parseInt(records)).skip(parseInt(begin)).toArray(function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

var read = function(collectionName, criteria, selection) {
    return new Promise(function(resolve, reject) {
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).find(criteria, selection).toArray(function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

var update = function(collectionName, criteria, updates) {
    return new Promise(function(resolve, reject) {
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).updateMany(criteria, { $set: updates }, { w: 1 }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

// var pushtoarray = function(collectionName, criteria, updates) {
//     return new Promise(function(resolve, reject) {
//         mongoConnectionPool.getInstance(function(error, db) {
//             if (error) {
//                 reject(error);
//             } else {
//                 db.collection(collectionName).updateMany(criteria, { $push: updates }, { w: 1 }, function(error, result) {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve(result);
//                     }
//                 });
//             }
//         });
//     });
// }

var remove = function(collectionName, criteria) {
    return new Promise(function(resolve, reject) {
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                reject(error);
            } else {
                db.collection(collectionName).deleteMany(criteria, { w: 1 }, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }
        });
    });
}

// var logActivity = function(data) {
//     insert('activity', [data])
//         .then(function(data) {})
//         .error(function(err) {
//             console.log('Error while logging activity');
//         });
// }


exports.insert = insert;
exports.update = update;
exports.read = read;
exports.readlimit = readlimit;
exports.remove = remove;
// exports.logActivity = logActivity;
// exports.pushtoarray = pushtoarray;
