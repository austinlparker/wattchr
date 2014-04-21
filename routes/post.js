var express = require('express');
var router = express.Router();

/* POST results */
router.post('/xml', function(req, res) {
	processXml(req.body, function() {
		res.send(200);
	});
});

module.exports = router;
