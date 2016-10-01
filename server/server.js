var jsonHttp = require('json-http');
var express = require('express');
var app = express();

app.use(express.static('../public'))

app.get('/api/sensores_smart_env_monitoring', function (req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('Request from: ' +  ip);
	jsonHttp.getJson('http://datos.santander.es/api/rest/datasets/sensores_smart_env_monitoring.json', function(err, response) {
		if(!err){
			res.status(200).send(response);
		}else{
			res.status(400);
		}
	});
});

app.get('/api/sensores_smart_irrigation', function(req, res){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('Request from: ' +  ip);
	jsonHttp.getJson('http://datos.santander.es/api/rest/datasets/sensores_smart_irrigation.json', function(err, response){
		if(!err){
			res.status(200).send(response);
		}else{
			res.status(400);
		}
	});
});

app.get('/api/sensores_moviles', function(req, res){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log('Request from: ' +  ip);
	jsonHttp.getJson('http://datos.santander.es/api/rest/datasets/sensores_smart_mobile.json', function(err, response){
		if(!err){
			res.status(200).send(response);
		}else{
			res.status(400);
		}
	});
});

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

app.listen(3000, function () {
  console.log('Server listening on port 3000');
});
