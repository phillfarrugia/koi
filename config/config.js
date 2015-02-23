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
    db: 'mongodb://localhost/koi-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'koi'
    },
    port: 3000,
    db: 'mongodb://localhost/koi-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'koi'
    },
    port: 3000,
    db: 'mongodb://localhost/koi-production'
  }
};

module.exports = config[env];
