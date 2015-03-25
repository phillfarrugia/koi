var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fflip = require('fflip'),
  features = fflip.userFeatures(process.env.NODE_ENV),
  passport = require('passport');

module.exports = function (app) {
  if (features.production) {
    app.use('/', router);
  };
};

router.get('/', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
        res.render('index', {
        title: 'Koi',
        users: users
      });
  });
});

if (features.development) {

router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });
});

router.post('/register', function(req, res, next) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', { user : user });
        }

        passport.authenticate('local')(req, res, function () {
          res.redirect('/');
        });
    });
});

};
