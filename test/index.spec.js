var express = require('express'),
config = require('../config/config'),
expect = require('chai').expect,
app = require('../app.js'),
request = require('supertest')(app);

describe('index', function() {

	it('should load the page', function(done) {
		request
		.get('/')
		.end(function(err, res) {
			console.log(res);
			done();
		})
	})

})