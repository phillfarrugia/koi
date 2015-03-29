var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fflip = require('fflip'),
  features = fflip.userFeatures(process.env.NODE_ENV),
  passport = require('passport');

module.exports = function (app) {
  if (features.development) {
    app.use('/stats', router);
  };
};

router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
        res.render('stats', {
        title: 'Koi | Stats',
        users: users
      });
  });
});