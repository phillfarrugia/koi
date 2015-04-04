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

router.all('/', function (req, res, next) {
  if (!req.user) {
    res.redirect('../');
  }
  next();
});

router.get('/', function (req, res, next) {
    res.render('dashboard', {
      title: 'Stats',
      user: req.user
    });
});