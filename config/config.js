var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'koi'
    },
    port: 3000,
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/koi-development'
  },

  staging: {
    root: rootPath,
    app: {
      name: 'koi'
    },
    port: 3000,
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/koi-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'koi'
    },
    port: 3000,
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/koi-production'
  }
};

module.exports = config[env];
