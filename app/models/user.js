/*
	Name: User Schema
	Description: A user is used to authenticate
	access into a School account. Use `_schoolId`
	to find and update school related documents. 
*/

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  _schoolId: { type: Schema.Types.ObjectId, ref: 'School' }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

