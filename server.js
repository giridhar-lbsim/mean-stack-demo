var express = require('express');
var logger = require("./utils/logger");
var app = express();
// importing Contact model
var Contact = require('./Contact.model');

// importing User model
var User = require('./User.model');

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
	console.log('save contact');
	console.log('req.body:', req.body);

	var newContact = new Contact();
	newContact.name = req.body.name;
	newContact.email  = req.body.email;
	newContact.number = req.body.number;

	newContact.save(function(err, contact){
		if (err) {
			res.send('error has occured');
		}else{
			console.log('saved contact:',contact);
			res.json(contact);
		}
	});

});

/*//save contact
//direct request saving
app.post('/contact2',function(req, res){
	console.log('req.body:',req.body);
	Contact.create(req.body,function(err, contact){
		if(err){
			res.send('error has occured while creating contact');
		}else{
			console.log('contact has been saved successfuly');
			res.json(contact);
		}
	});
});*/

//get all contact
app.get('/contact',function(req, res){
	console.log('get contactlist');
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
	console.log("id in server side",id);
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
	console.log("id in server side",id);
	Contact.findOneAndRemove({_id:id},function(err, contact){
		if(err){
			res.send('error has occured while deleting a contact');
		}else
		res.json(contact);
	});
});

app.post('/login', function(req, res){
	logger.info('login request',req.body.email);
	User.findOne({email:req.body.email,password:req.body.password}, function(err, user){
		if(err){
			res.send('error while login: ',err);
		}else{
			if(user !== null){
				// logger.info('user:',user);
			res.json(user);
			}else{
				res.json('Invalid email or password');
			}
		}
	})
});

app.post('/user/find-by-id/:id', function(req, res){
	var id = req.params.id;
	User.findById(id,function(err, user){
		if(err){
			res.send('error while finding user by id:',id);
		}else{
			console.log('user in server side: ',user);
			// logger.info('user from server: ',user);
			res.json(user);
		}
	});

});

/*
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