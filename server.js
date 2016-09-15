var express = require('express');
var app = express();

var Contact = require('./Contact.model');

// var mongojs = require('mongojs');
// var db = mongojs('contactlist',['contactlist']);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactlist');

var bodyParser = require('body-parser');

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.get('/contactlist',function(req, res){
	console.log('get contactlist');
	Contact.find({}).exec(function(err, contacts){
		if(err){
			res.send('error has occured');
		}else{
			res.json(contacts);
		}
	});

});

app.post('/contactlist',function(req, res){
	console.log('save contact');
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});

});
/*

app.get('/contactlist',function(req, res){
	console.log('get contactlist');
 	mongoose.contactlist.find(function(err, docs){
 		res.json(docs);
 	});
    
});

app.post('/contactlist',function(req, res){
	console.log('save contact');
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});

});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log("id in server side",id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	})
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log('server: request of PUT req:',req.body);
	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
	update:{$set:{name:req.body.name, email:req.body.email, number:req.body.number}},
	new: true},function(err, docs){
		res.json(docs);
	});
});
*/
app.listen(3000);
console.log('server running on port 3000');