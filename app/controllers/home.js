var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fflip = require('fflip'),
  Features = fflip.userFeatures(process.env.NODE_ENV),
  passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  User.find(function (err, articles) {
    if (err) return next(err);
        res.render('index', {
        title: 'Koi',
        articles: articles
      });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });
});

router.post('/register', function(req, res, next) {
  User.register(new User({ email : req.body.email }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
});
