/*
	Name: Menu Schema
	Description: A Menu is simply a list of products
	and catogories used to display items
	to users for a given School.
*/

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MenuSchema = new Schema({
	_schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
	categories: [{
  		title: String,
  		description: String
  	}],
  	products: [{
  	title: String,
  	description: String,
  	price: Number
  }]
});

module.exports = mongoose.model('Menu', MenuSchema);

