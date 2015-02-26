/*
 *  Feature flags based on current environment
 */
var fflip = require('fflip');

fflip.config({
  criteria: {
    isDevelopment: function(env, isDevelopment) {
      return env == 'development' || !env;
    },

    isTest: function(env, isTest) {
      return env == 'development' || env == 'test';
    },

    isProduction: function(env, isProduction) {
      return env == 'development' || env == 'test' || env == 'production';
    }
  },

  features: {
    development: {
      name: "Development Features",
      criteria: {
        isDevelopment: true
      }
    },

    test: {
      name: "Test Features",
      criteria: {
        isTest: true
      }
    },

    production: {
      name: "Production Features",
      criteria: {
        isProduction: true
      }
    }
  },

  reload: 30
});

module.exports = fflip;