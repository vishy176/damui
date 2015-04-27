var express = require('express');
var router = express.Router();
var url = require('url');


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getData(link) {
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", link, false);
	xhReq.setRequestHeader("Authorization","Basic WVhCcFlXUnRhVzQ2YlRGOnVkSEpoVWpCamEyVjBNVE1oSXc9PQ==");
	//xhReq.setRequestHeader("Accept","application/json");
	//xhReq.setRequestHeader("Content-Type","application/json");
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

router.get('/styleimage', function(req, res, next) {

});

router.get('/videolist', function(req, res, next) {
  res.render('videolist', { title: 'videolist' });
});


router.get('/styleid',function(req,res){
	var queryParam = url.parse(req.url, true).query;   //--Extracting 'styleId' parameter from url
	
	console.log(queryParam.styleId);

	var link = "http://catalogservice.myntra.com/myntra-catalog-service/style/" + queryParam.styleId;
	res.send(req.query.callback + '('+ JSON.parse(getData(link).responseText) + ');');
	
	console.log(res.data[0].name)
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
	//console.log(response);
	//console.log(response['listdata']);
	// console.log(response['listdata'][0]);
	// console.log("********");
	// console.log(response["listdata"][0]['id'])
	// console.log(response["listdata"][0]['listofalbums'])
	// console.log("********");
	var listofalbums=response.listdata[0].listofalbums;
	for(var key in listofalbums ){
		console.log(key);
		if(key=='360Album'){
			for (var i = listofalbums[key].length - 1; i >= 0; i--) {
				console.log(listofalbums[key][i]);
			};
		}
		if(key=='imageAlbum'){
			for (var i = listofalbums[key].length - 1; i >= 0; i--) {
				console.log(listofalbums[key][i]);
			};

		}
		if(key=='videoAlbum'){
			for (var i = listofalbums[key].length - 1; i >= 0; i--) {
				console.log(listofalbums[key][i]);
			}; 
		}

	}




});

module.exports = router;
