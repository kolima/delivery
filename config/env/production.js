'use strict';

module.exports = {
	db: {
		uri: process.env.CLEARDB_DATABASE_URL,
		options: {
			dialect: 'postgres',
			define: {
				timestamps: false
			}
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined'
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap-css-only/css/bootstrap.min.css',
				'public/lib/font-awesome/css/font-awesome.min.css'
			],
			js: [
				'public/lib/angular/angular.min.js',
				'public/lib/angular-animate/angular-animate.min.js',
				'public/lib/angular-ui-router/release/angular-ui-router.min.js'
			]
		},
		css: 'public/dist/application.min.css',
		js: ['public/dist/lib.min.js', 'public/dist/application.min.js']
	}
};
