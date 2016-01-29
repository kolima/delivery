'use strict';

module.exports = {
	app: {
		title: 'Delivery',
		description: 'Delivery',
		keywords: ''
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'combined',
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	compiler: 'javascript',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/font-awesome/css/font-awesome.css'
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/bootstrap/dist/js/bootstrap.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-local-storage/dist/angular-local-storage.js',
				'public/lib/angular-jwt/dist/angular-jwt.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-translate-loader-url/angular-translate-loader-url.js',
				'public/lib/angular-translate-loader-partial/angular-translate-loader-partial.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js'

			]
		},
		css: [
			'public/css/*.css'
		],
		sass: [
		],
		iJs: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*.json',
			'public/modules/*/*[!tests]*/*.js'
		],
		js: 'public/dist/application.min.js',
		views: ['public/modules/*/views/**/*.html'],
		server: {
			js: ['gulp.js', 'server.js', 'config/**/*.js', 'app/*/**/*.js'],
			views: 'app/views/views/*.html'
		}
	}
};
