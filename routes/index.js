var express = require('express');
var router = express.Router();


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getData(link) {
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", link, false);
	xhReq.setRequestHeader("Authorization","Basic WVhCcFlXUnRhVzQ2YlRGOnVkSEpoVWpCamEyVjBNVE1oSXc9PQ==");
	xhReq.setRequestHeader("Accept","application/json");
	xhReq.setRequestHeader("Content-Type","application/json");
	xhReq.send(null);
	return xhReq;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/videoupload', function(req, res, next) {
  res.render('videoupload', { title: 'videoupload' });
});

router.get('/videolist', function(req, res, next) {
  res.render('videolist', { title: 'videolist' });
});

router.post('/',function(req,res){
	var styleid=req.body.styleid;
	console.log(styleid);
	function getCallData(stylesid) {
       	var link = "http://localhost:8282/myntra-asset-service/product/";
       	link=link+styleid;

		console.log(link);
		return JSON.parse(getData(link).responseText);
	}
	var response=getCallData(styleid);
	console.log(response);
	console.log(response['listdata']);


});

module.exports = router;
