var space_data = require('./space_data');

// Modules & Reqs
var mongoose = require('mongoose'),
  Space = require('./models/space.js');

// Connect to DB
// mongoose.connect('mongodb://localhost/nyc_cowork_map_app_dev', function(err) {
//   if(err) {
//     console.log('Connection error: ', err);
//   } else {
//     console.log('Connection Successful');
//   }
// });

for( var i=0; i<space_data.length; i++ ){
  var space = space_data[i];
  var space = new Space(space);
  space.save(function(err){
    if(err) return handleError(err);
    console.log("saved: " + space.name);
  })
}

console.log('=========================================');
console.log('SEEDING COMPLETE: remember to comment out');
console.log('=========================================');
