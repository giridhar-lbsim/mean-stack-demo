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
// app.use(bodyParser.urlencoded({extended:true}));


//save contact
app.post('/contact',function(req, res){
	var newContact = new Contact();
	newContact.name = req.body.name;
	newContact.email  = req.body.email;
	newContact.number = req.body.number;

	newContact.save(function(err, contact){
		if (err) {
			res.send('error has occured');
		}else{
			res.json(contact);
		}
	});

});

/*//save contact
//direct request saving
app.post('/contact2',function(req, res){
	Contact.create(req.body,function(err, contact){
		if(err){
			res.send('error has occured while creating contact');
		}else{
			res.json(contact);
		}
	});
});*/

//get all contact
app.get('/contact',function(req, res){
	Contact.find({}).exec(function(err, contacts){
		if(err){
			res.send('error has occured');
		}else{
			res.json(contacts);
		}
	});

});
// get contact by id
app.get('/contact/:id', function(req, res){
	var id = req.params.id;
	Contact.findOne({_id:id}).exec(function(err, contact){
		if(err){
			res.send('error has occured');
		}else{
			res.json(contact);
		}
	});
});

//finding and updating contact

app.put('/contact/:id', function(req, res){
	var id = req.params.id;
	Contact.findOneAndUpdate({_id:id},{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},{upsert:true},function(err, contact){
		if(err){
			res.send('error while finding and updating contact');
		}else{
			res.json(contact);
		}
	});
});

//delete a contact by id

app.delete('/contact/:id', function(req, res){
	var id = req.params.id;
	Contact.findOneAndRemove({_id:id},function(err, contact){
		if(err){
			res.send('error has occured while deleting a contact');
		}else
		res.json(contact);
	});
});

/*
app.post('/contactlist',function(req, res){
	db.contactlist.insert(req.body, function(err, docs){
		res.json(docs);
	});

});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	})
});



app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
	update:{$set:{name:req.body.name, email:req.body.email, number:req.body.number}},
	new: true},function(err, docs){
		res.json(docs);
	});
});
*/
app.listen(3000);
console.log('server running on port 3000');