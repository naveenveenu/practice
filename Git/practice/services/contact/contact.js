var entity = require("../db/mongoEntity");
var Promise = require('bluebird');
var mongoConnectionPool = require('../db/mongoDBConnection');

var authprofile = {

    authorrating: function(req, res, next) {
        var id = req.body.patentid;

        entity.update('patents', { "id": id, "authors.name": req.session.user.mail }, { 'authors.$.rated': true, authorrating:{ rating: req.body.rating, feedback: req.body.feedback }}).then(function(result) {
            console.log(JSON.stringify(result));
            if (result.length == 0)
                res.json([]);
            else
                res.json(result);
        }).catch(function(error) {
            console.log("Error while adding rating to patent details" + error);
        });
    },


    getpatentscount: function(req, res, next) {
        var mail = req.session.user.mail;

        var criteria = {};
        if (req.query.id)
            criteria.id = { $regex: req.query.id, $options: 'i' };
        if (req.query.state && req.query.state != 'ALL')
            criteria.state = req.query.state;
        else
            criteria.state = {$ne: 'SUBMITTED'};
        criteria.authors = { "$elemMatch": { name: mail } };
        console.log('Filter criteria: ' + JSON.stringify(criteria));
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                res.json(error);
            } else {
                db.collection('patents').find(criteria).count(function(error, count) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(count);
                    }
                });
            }
        });

    },

    getpatents: function(req, res, next) {
        var mail = req.session.user.mail;
        var begin = req.query.begin;
        var records = req.query.records;

        var criteria = {};
        if (req.query.id)
            criteria.id = { $regex: req.query.id, $options: 'i' };
        if (req.query.state && req.query.state != 'ALL')
            criteria.state = req.query.state;
        else
            criteria.state = {$ne: 'SUBMITTED'};
        criteria.authors = { "$elemMatch": { name: mail } };
        console.log('Filter criteria: ' + JSON.stringify(criteria));
        mongoConnectionPool.getInstance(function(error, db) {
            if (error) {
                res.json(error);
            } else {
                db.collection('patents').find(criteria).sort({ id: 1 }).limit(parseInt(records)).skip(parseInt(begin)).toArray(function(error, result) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(result);
                    }
                });
            }
        });

    },

};

module.exports = authprofile;
