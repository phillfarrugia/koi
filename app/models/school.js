/*
	Name: School Schema
	Description: A School is the center of
	the object graph and has a one to many
	relationship with the User Schema.
*/

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SchoolSchema = new Schema({
  name: String
});

module.exports = mongoose.model('School', SchoolSchema);

