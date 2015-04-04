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

/*
 *  Path: '/staff/*'
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
 *  Path: '/staff'
 *  HTTP: GET
 *  Description: Loads the logged in user's
 *  admin staff view
 */
router.get('/', function (req, res, next) {
    res.render('dashboard', {
      title: 'Staff',
      user: req.user
    });
});