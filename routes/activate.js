var express = require('express');
var router = express.Router();
var xmlparser = require('express-xml-bodyparser');

/* GET */
router.get('/activate', function(req,res) {
	res.render('index', { title: 'Activation' });
});

/* get activation request */
router.post('/activate', xmlparser({trim: false, explicitArray: false}),
function(req, res, next) {
	Console.log(req.body);
	res.send(200);
});

module.exports = router;
