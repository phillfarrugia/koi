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
  User.findOne(function (err, user) {
    if (err) return next(err);
        res.render('index', {
        title: 'Koi',
        user: user
      });
  });
});

if (features.staging) {

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.redirect('/');
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
