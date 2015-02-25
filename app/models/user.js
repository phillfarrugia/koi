// User model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  name: String,
  role: Number
});

User.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);

