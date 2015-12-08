// =============================
// Requirements
// =============================
var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	logger = require('morgan'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');


// =============================
// Middleware
// =============================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));


// =============================
// DB
// =============================
// DATABASE FOR LOCAL OR HEROKU DEPLOYMENT
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/nyc_cowork_map_app_dev';
mongoose.connect(mongoUri);


// =============================
// Models
// =============================
var Space = require('./models/space.js');


// =============================
// Seed - run one and done son!
// =============================
// var seed = require('./seed.js');


// =============================
// Routes
// =============================
// Index
app.get('/spaces', function(req, res) {
	Space.find().then(function(spaces) {
		console.log('==================');
		console.log(spaces);
		console.log(typeof spaces);
		console.log('==================');
		res.send(spaces);
	});
});

// Show - test via POSTMAN (http://localhost:3000/books/5658a3da895cc0e22913f94a)
app.get('/spaces/:id', function(req, res) {
	Space.findById(req.params.id).then(function(space) {
		console.log('==================');
		console.log(space);
		console.log(typeof space);
		console.log('==================');
		res.send(space);
	});
});

// Create
//  POSTMAN TEST:
// 	- title: "War And Peace"
// 	- author: "Leo Tolstoy"
// 	-	imgURL: "http://images.fashionnstyle.com/data/images/full/64729/war-and-peace.jpg?w=600"
app.post('/spaces', function(req, res) {
	var space = new Space(req.body);
	space.save(function(err) {
		if(err) {
			console.log('ERROR: ' + err);
		} else {
			console.log("Saaved!");
			res.send(space);
		}
	});
});

// Update
// 	POSTMAN TEST:
// 	- _id: "565a1b9abde674c14a5e8a80"
// 	- title: "War And Reeses Pieces"
// 	- author: "Leo Tolstoy"
// 	-	imgURL: "http://images.fashionnstyle.com/data/images/full/64729/war-and-peace.jpg?w=600"
app.put('/spaces/:id', function(req, res) {
	Spaces.findOneAndUpdate({
		_id: req.params.id
	}, {
		$set: req.body
	}, function(err, space) {
		res.send(space);
	});
});

// Delete
app.delete('/spaces/:id', function(req, res) {
	Space.findOneAndRemove({_id: req.params.id}, function(err) {
		if(err) console.log(err);
		console.log('Space deleted');
		res.send('Space deleted');
	});
});


// =============================
// Listen
// =============================
app.listen(port);
console.log('Server started at port: ' + port);
