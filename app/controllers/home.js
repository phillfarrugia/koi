var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  fflip = require('fflip'),
  Features = fflip.userFeatures(process.env.NODE_ENV);

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
