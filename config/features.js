/*
 *  Feature flags based on current environment
 */
var fflip = require('fflip');

fflip.config({
  criteria: {
    isDevelopment: function(env, isDevelopment) {
      return !env || env == 'development';
    },

    isStaging: function(env, isTest) {
      return !env || env == 'development' || env == 'staging';
    },

    isProduction: function(env, isProduction) {
      return !env || env == 'development' || env == 'staging' || env == 'production';
    }
  },

  features: {
    development: {
      name: "Development Features",
      criteria: {
        isDevelopment: true
      }
    },

    staging: {
      name: "Staging Features",
      criteria: {
        isStaging: true
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