'use strict';

module.exports = {
	db: {
		uri: 'postgres://postgres:12345678@localhost:5432/postgres',
		options: {
			dialect: 'postgres',
			define: {
				timestamps: false
			}
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev'
	},
	app: {
		title: 'Delivery - Development Environment'
	}
};
