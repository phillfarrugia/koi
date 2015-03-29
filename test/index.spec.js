var express = require('express'),
config = require('../config/config'),
expect = require('chai').expect,
app = require('../app.js'),
request = require('supertest')(app),
mongoose = require('mongoose'),
clearDB = require('mocha-mongoose')(config.db, { noClear: true }),
User = mongoose.model('User');

describe('index', function() {
	var testUser = {
			username: 'sample._Email@emailName.com',
			password: 'tHi$isA_S@Mp7e+PaS$w0rD'
	};

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

		beforeEach(function(done) {
			clearDB(done);
		})

		//TODO: Implement validation when you have time
		it('should validate the email address')
		it('should validate the password')

		it('should handle a valid POST request', function(done) {
			request
			.post('/register')
			.send(testUser)
			.end(function(err, res) {
				expect(res).to.exist;
				expect(err).to.not.exist;
				done();
			})
		})

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

		it('should authenticate and redirect', function(done) {
			request
			.post('/register')
			.send(testUser)
			.expect(302, function(err, res) {
				expect(res.headers.location).to.equal('/dashboard');
				done();
			})
		})

		it('should error if user already exists', function(done) {
			request
			.post('/register')
			.send(testUser)
			.end(function(err, res) {
				tryAgain();
			})

			function tryAgain() {
				request
				.post('/register')
				.send(testUser)
				.expect(500, function(err, res) {
					done();
				})
			}
		});	
	})

	context('login', function() {

		it('should handle a valid POST request', function(done) { 
			request
			.post('/login')
			.send(testUser)
			.expect(302, function(err, res) {
				expect(res).to.exist;
				expect(err).to.not.exist;
				done();
			})
		})

		it('should handle an invalid POST request', function(done) {
			request
			.post('/login')
			.send()
			.expect(400, function(err, res) {
				done();
			})
		});

		it('should authenticate and redirect', function(done) {
			request
			.post('/login')
			.send(testUser)
			.expect(302, function(err, res) {
				expect(res.headers.location).to.equal('/dashboard');
				done();
			})
		})
	})
})