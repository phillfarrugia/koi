/*
	Name: Product Schema
	Description: A Product is a specific
	item for sale. Categories, prices
	and availability can be applied.
*/

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProductSchema = new Schema({
	_schoolId: { type: Schema.Types.ObjectId, ref: 'School' },
	_categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  	title: String,
  	description: String,
  	price: Number,
  	available: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);

