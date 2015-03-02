#!/bin/bash

set -o errexit # Exit on error

# Install sass
gem install sass

# Install dev npm dependencies
npm install bower -g
npm install grunt
npm install grunt-cli -g
npm install grunt-bower-concat
npm install grunt-contrib-cssmin
npm install grunt-contrib-sass
npm install grunt-contrib-uglify
npm install grunt-develop
npm install load-grunt-tasks
npm install request
npm install time-grunt

# Build front end dependencies
bower install
grunt build