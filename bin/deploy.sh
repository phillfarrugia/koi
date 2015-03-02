#!/bin/bash

set -o errexit # Exit on error

# Install dev npm dependencies
npm install grunt@0.4.5
npm install grunt-cli@0.1.13
npm install grunt-bower-concat@0.4.0
npm install grunt-contrib-cssmin@0.12.2
npm install grunt-contrib-sass@0.9.2
npm install grunt-contrib-uglify@0.8.0
npm install grunt-develop@0.4.0
npm install load-grunt-tasks@2.0.0
npm install request@2.51.0
npm install time-grunt@1.0.0

# Build front end dependencies
bower install
grunt build