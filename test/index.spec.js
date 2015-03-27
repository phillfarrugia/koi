var express = require('express'),
config = require('../config/config'),
expect = require('chai').expect,
app = require('../app.js'),
request = require('supertest')(app),
mongoose = require('mongoose'),
clearDB = require('mocha-mongoose')(config.db),
User = mongoose.model('User');

describe('index', function() {

	it('should load the page', function(done) {
		request
		.get('/')
		.expect(200)
		.end(function(err, res) {
			expect(res).to.exist;
			done();
		})
	})

	context('registration', function() {
		var testUser = {
			username: 'sample._Email@emailName.com',
			password: 'tHi$isA_S@Mp7e+PaS$w0rD'
		};

		//TODO: Implement validation when you have time
		it('should validate the email address')
		it('should validate the password')

		it('should handle a valid request from the registration form', function(done) {
			request
			.post('/register')
			.send(testUser)
			.expect(302) //redirect
			.end(function(err, res) {
				expect(res).to.exist;
				expect(err).to.not.exist;
				expect(res.headers.location).to.equal('/');
				done();
			})
		})

		it('should authenticate a new user')

		it('should create a new user in the database', function(done) {
			request
			.post('/register')
			.send(testUser)
			.end(function(err, res) {
				User.find({ 'username': testUser.username }, function(err, users) {
					var user = users[0];

					expect(err).to.not.exist;
					expect(users).to.have.length(1);

					expect(user.username).to.equal(testUser.username);
					expect(user._id).to.exist;
					expect(user.salt).to.exist;
					expect(user.hash).to.exist;
					done();
				})
			})
		})
	})
})