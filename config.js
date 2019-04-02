'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost/peak-flow',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'mongodb://localhost/peak-flow-test'
};
