'use strict';

module.exports = {
	db: {
		uri: process.env.CLEARDB_DATABASE_URL,
		options: {
			dialect: 'mysql',
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
