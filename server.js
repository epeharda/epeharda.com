var express = require('express'),
	api = require('./api'),
    app = express(),
    path = require('path'),
    publicDir = path.join(__dirname, 'public');

app
   .use(express.static(publicDir))
   //below is wiring up the node.js backend
   .use('/api', api)
   .get('*', function(req, res){
    res.sendFile(path.join(publicDir, 'index.html'));
	})
   .listen(3000);