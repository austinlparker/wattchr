var express = require('express');
var router = express.Router();
var xmlparser = require('express-xml-bodyparser');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET hello world */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello, World!' })
});

/* POST activation */
router.post('/activation', xmlparser({trim: false, explicitArray: false}), function(req, res, next){
	console.log(req.body);
	res.send(200);
})

module.exports = router;
