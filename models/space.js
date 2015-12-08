var mongoose = require('mongoose');

var SpaceSchema = mongoose.Schema({
	name: String,
	lat: Number,
	lng: Number,
	address: String,
  url : String
})

var Space =  mongoose.model('Space', SpaceSchema);
module.exports = Space;
//I don't know about this last line, though...
