'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	defaultAssets = require('./config/env/all').assets,
	gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	runSequence = require('run-sequence'),
	plugins = gulpLoadPlugins();

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
	process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
	process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
	process.env.NODE_ENV = 'production';
});

// Nodemon task
gulp.task('nodemon', function () {
	return plugins.nodemon({
		script: 'server.js',
		env: {
			NODE_ENV: process.env.NODE_ENV
		},
		ext: 'js,html',
		watch: _.union(defaultAssets.server.views, defaultAssets.server.js)
	});
});

// Watch Files For Changes
gulp.task('watch', function() {
	// Start livereload
	plugins.livereload.listen();

	// Add watch rules
	gulp.watch(defaultAssets.server.views).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.server.js, ['jshint']).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.views).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.iJs, ['jshint', 'uglify']).on('change', plugins.livereload.changed);
	gulp.watch(defaultAssets.sass, ['sass']).on('change', plugins.livereload.changed);
});

// JS linting task
gulp.task('jshint', function () {
	return gulp.src(_.union(defaultAssets.server.js, defaultAssets.js))
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'))
		.pipe(plugins.jshint.reporter('fail'));
});

// JS lib minifying task
gulp.task('libmin', function() {
	return gulp.src(defaultAssets.lib.js)
		.pipe(plugins.concat('lib.min.js'))
		.pipe(gulp.dest('public/dist'));
});

// JS minifying task
gulp.task('uglify', function () {
	return gulp.src(defaultAssets.iJs)
		.pipe(plugins.babel())
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('application.min.js'))
		.pipe(plugins.uglify({
			mangle: false
		}))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('public/dist'));
});

// CSS minifying task
gulp.task('cssmin', function () {
	return gulp.src(defaultAssets.css)
		.pipe(plugins.cssmin())
		.pipe(plugins.concat('application.min.css'))
		.pipe(gulp.dest('public/dist'));
});

// Lint project files and minify them into two production files.
gulp.task('build', function(done) {
	runSequence('jshint', 'libmin', ['uglify', 'cssmin'], done);
});

// Run the project in development mode
gulp.task('default', function(done) {
	runSequence('env:dev', 'jshint', 'uglify', ['nodemon', 'watch'], done);
});

// Run the project in debug mode
gulp.task('debug', function(done) {
	runSequence('env:dev', 'jshint', ['nodemon', 'watch'], done);
});

// Run the project in production mode
gulp.task('prod', function(done) {
	runSequence('env:prod', 'jshint', 'build', ['nodemon'], done);
});
