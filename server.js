'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
    config = require('./config/config'),
    Sequelize = require('sequelize'),
    chalk = require('chalk');

// Bootstrap db connection
var db = new Sequelize(config.db.uri, config.db.options);

db.authenticate().catch(function (err) {
    console.error(chalk.red('Sequelize connection error: ' + err));
    process.exit(-1);
});

var models = require('./config/sequelize').setModels(db);

// Init the express application
var app = require('./config/express')(models);

app.listen(config.port);


// Expose app
module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));
console.log('--');
