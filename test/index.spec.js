var express = require('express'),
config = require('../config/config'),
expect = require('chai').expect,
app = require('../app.js'),
request = require('supertest')(app),
mongoose = require('mongoose'),
mockgoose = require('mockgoose');

describe('index', function() {

	before(function(done) {
		mockgoose(mongoose);
		done();
	});

	it('should load the page', function(done) {
		request
		.get('/')
		.expect(200)
		.end(function(err, res) {
			expect(res).to.exist;
			done();
		})
	})

})