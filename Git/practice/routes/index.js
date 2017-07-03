var express = require('express');
var router = express.Router();

var contact = require('../services/contact/contact');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/contact/getContacts', contact.getContacts);
router.post('/contact/addContact', contact.insertContact);
router.post('/contact/deleteContact', contact.deleteContact);
router.post('/contact/updateContact', contact.updateContact);

module.exports = router;
