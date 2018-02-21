var express = require('express');
var router = express.Router();
var details = require('./details');
const {OperationHelper} = require('apac');


var opHelper = new OperationHelper({
    awsId:     details.AccessId,
    awsSecret: details.Secret,
    assocId:   details.Tag,
    locale:    'US'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });

  	opHelper.execute('ItemSearch', {
		'SearchIndex': 'Electronics',
	  	'Keywords': 'surface',
	  	'ResponseGroup': 'ItemAttributes,Offers'
	}).then((response) => {
		res.send(response.result)
	    //console.log("Results object: ", response.result);
	    //console.log("Raw response body: ", response.responseBody);
	}).catch((err) => {
	    console.error("Something went wrong! ", err);
	});
});

module.exports = router;
