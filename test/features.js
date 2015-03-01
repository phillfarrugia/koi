var assert = require("assert"),
features = require('../config/features'),
fflip = require('fflip');

describe('feature flags', function() {
	describe('when development', function() {
		it('should meet the development critera', function() {
			var Features = fflip.userFeatures('development');

			// all features visible in development
			assert.equal(Features.development, true);
			assert.equal(Features.test, true);
			assert.equal(Features.production, true);
		})
	})

	describe('when test', function() {
		it('should meet the test criteria', function() {
			var Features = fflip.userFeatures('test');

			// only test and production visible in test
			assert.equal(Features.development, false);
			assert.equal(Features.test, true);
			assert.equal(Features.production, true);
		})
	})

	describe('when production', function() {
		it('should meet the production criteria', function() {
			var Features = fflip.userFeatures('production');

			// only production visible in production
			assert.equal(Features.development, false);
			assert.equal(Features.test, false);
			assert.equal(Features.production, true);
		})
	})
})
