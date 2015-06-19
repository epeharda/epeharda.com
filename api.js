//simple rest api
//this is the node.js backend

var express = require('express'),
	Bourne = require('bourne'),
	bodyParser = require('body-parser'),

	db = new Bourne('data.json'),
	router = express.Router();


router
	.use(function(req, res, next){
		//this is temporary until we have authentication
		if(!req.user) req.user = {id: 1};
		next();
	})
	.use(bodyParser.json())
	.route('/contact')
		.get(function(req, res){
			//takes a query object where we look for user id, and store as int instead of string
			db.find({ userId : parseInt(req.user.id, 10)}, function(err, data){
				//sends data back to browser
				res.json(data);
			});
		})
		.post(function(req, res){
			//creating new contact record
			var contact = req.body;
			contact.userId = req.user.id;

			db.insert(contact, function(err, data){
				res.json(data);
			});
		});

//send back /contact/userid for html
router
	.param('id', function(req, res, next){
		req.dbQuery = { id: parseInt(req.params.id, 10)}
	})
	.route('/contact/:id')
		.get(function(req, res){
			db.findOne(req.dbQuery, function(err, data){
				res.json(data);
			});
		})
		.put(function(req, res){
			var contact = req.body;
			delete contact.$promise;
			delete contact.$resolved;
			db.update(req.dbQuery, contact, function(err, data){
				res.json(data[0]);
			});
		})
		.delete(function(req, res){
			db. delete(req.dbQuery, function(){
				res.json(null);
			});
		});

module.exports = router;
