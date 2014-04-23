var express = require('express');
var router = express.Router();
var xmlparser = require('express-xml-bodyparser');
var builder = require('xmlbuilder');
var util = require('util');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'wattchr' });
});

/* GET hello world */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello, World!' })
});

/* POST activation */
router.post('/activation', xmlparser({trim: false, explicitArray: false}), function(req, res, next){
	var data = req.body;
	var db = req.db;
	var activation_response = '<ted500ActivationResponse>\n';
	activation_response += '<PostServer>wattchr.austinlparker.com</PostServer>\n';
	activation_response += '<UseSSL>F</UseSSL>\n';
	activation_response += '<PostPort>3000</PostPort>\n';
	activation_response += '<PostURL>/postdata</PostURL>\n';
	activation_response += '<AuthToken></AuthToken>\n';
	activation_response += '<PostRate>5</PostRate>\n';
	activation_response += '<HighPrec>F</HighPrec>\n';
	activation_response += '</ted500ActivationResponse>\n';

	console.log(data['ted5000Activation'].Gateway);
	console.log(activation_response);
	var new_gateway = { gateway: data['ted5000Activation'].Gateway }
	db.collection('gateways').insert(new_gateway, function(err) {
		if(err) {
			return console.log('insert error', err);
		}
	});
	res.writeHead(0, {'Content-Type': 'application/xml'} );
	res.end(activation_response);
});

/* POST data */

router.post('/postdata', xmlparser({trim: false, explicitArray: false, strict: false}), function(req, res, next){
	var data = req.body;
	var db = req.db;

	var entry = { 
		gateway: data['TED5000'].$.GWID, 
		timestamp: data['TED5000'].MTU.CUMULATIVE.$.TIMESTAMP,
		watts: data['TED5000'].MTU.CUMULATIVE.$.WATTS
	  }

	db.collection('gateways').insert(entry, function(err) {
		if(err) {
			return console.log('insert error', err);
		}
	});

  	console.log(entry);
	console.log(util.inspect(data, false, null));
	res.send(200);
});

module.exports = router;
