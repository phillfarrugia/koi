var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fflip = require('fflip'),
  features = fflip.userFeatures(process.env.NODE_ENV),
  passport = require('passport');

module.exports = function (app) {
  if (features.development) {
    app.use('/staff', router);
  };
};

router.get('/', function (req, res, next) {
    res.render('dashboard', {
      title: 'Staff',
      user: req.user
    });
});