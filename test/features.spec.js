var assert = require("assert"),
features = require('../config/features'),
fflip = require('fflip');

describe('feature flags', function() {
	describe('undefined', function() {
		it('should meet the development critera', function() {
			var Features = fflip.userFeatures(undefined);

			// all features visible in development
			assert.equal(Features.development, true);
			assert.equal(Features.staging, true);
			assert.equal(Features.production, true);
		})
	})

	describe('development', function() {
		it('should meet the development critera', function() {
			var Features = fflip.userFeatures('development');

			// all features visible in development
			assert.equal(Features.development, true);
			assert.equal(Features.staging, true);
			assert.equal(Features.production, true);
		})
	})

	describe('staging', function() {
		it('should meet the staging criteria', function() {
			var Features = fflip.userFeatures('staging');

			// only test and production visible in test
			assert.equal(Features.development, false);
			assert.equal(Features.staging, true);
			assert.equal(Features.production, true);
		})
	})

	describe('production', function() {
		it('should meet the production criteria', function() {
			var Features = fflip.userFeatures('production');

			// only production visible in production
			assert.equal(Features.development, false);
			assert.equal(Features.staging, false);
			assert.equal(Features.production, true);
		})
	})
})
