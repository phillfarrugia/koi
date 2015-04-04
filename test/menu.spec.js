var express = require('express'),
config = require('../config/config'),
expect = require('chai').expect,
app = require('../app.js'),
request = require('supertest')(app),
mongoose = require('mongoose'),
clearDB = require('mocha-mongoose')('mongodb://localhost/koi-mocha', { noClear: true }),
User = mongoose.model('User'),
School = mongoose.model('School');

describe('menu', function() {
	var testUser = {
			schoolname: 'St. Pauls Catholic College',
			username: 'sample._Email@emailName.com',
			password: 'tHi$isA_S@Mp7e+PaS$w0rD'
	};

	context('authentication', function() {
		it('should redirect if no user', function(done) {
			request
			.get('/menu')
			.expect(302)
			.end(function(err, res) {
				expect(err).to.not.exist;
				expect(res).to.exist;
				expect(res.headers.location).to.equal('../');
				done();
			})
		});
	});
});