const baseConfig = require('../../eslint.base.config.js');
const config = require('../../eslint.config.js');

module.exports = [...baseConfig, ...config];
