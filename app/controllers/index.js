var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  fflip = require('fflip'),
  features = fflip.userFeatures(process.env.NODE_ENV),
  passport = require('passport'),
  session = require('express-session');

var User = mongoose.model('User'),
  School = mongoose.model('School');

module.exports = function (app) {
  if (features.production) {
    app.use('/', router);
  };
};

/*
 *  Path: '/'
 *  HTTP: GET
 *  Description: Loads the application landing
 *  page.
 */
router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'Home',
      user: req.user
    });
});

if (features.staging) {

/*
 *  Path: '/login'
 *  HTTP: POST
 *  Description: Send POST requests
 *  to this path to authenticate a User
 */
router.post('/login', passport.authenticate('local'), function(req, res, next) {
    res.redirect('/dashboard');
});

/*
 *  Path: '/logout'
 *  HTTP: GET
 *  Description: Send a GET request
 *  to this path to logout from a session
 */
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

/*
 *  Path: '/register'
 *  HTTP: POST
 *  Description: Send a POST request
 *  to this path to create a new User
 */
router.post('/register', function(req, res, next) {
  School.create({ name: req.body.schoolname }, function (err, school) {
    if (err) return handleError(err);

    User.register(new User({ username: req.body.username, _schoolId: school.id }), req.body.password, function(err, user) {
        if (err) return res.render('register', { user: user });
        
        passport.authenticate('local')(req, res, function() {
          res.redirect('/dashboard');
        });
    });
  });
});

};
