var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fflip = require('fflip'),
  features = fflip.userFeatures(process.env.NODE_ENV),
  passport = require('passport');

module.exports = function (app) {
  if (features.development) {
    app.use('/dashboard', router);
  };
};

/*
 *  Path: '/dashboard/*'
 *  HTTP: All
 *  Description: Require authentication on
 *  all requests beneath this layer
 */
router.all('/', function (req, res, next) {
  if (!req.user) {
    res.redirect('../');
  } else {
    next();
  }
});

/*
 *  Path: '/dashboard'
 *  HTTP: GET
 *  Description: Loads the logged in user's
 *  admin dashboard view
 */
router.get('/', function (req, res, next) {
    res.render('dashboard', {
      title: 'Dashboard',
      user: req.user
    });
});