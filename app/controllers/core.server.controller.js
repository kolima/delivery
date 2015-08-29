'use strict';

var fs = require('fs');

exports.index = function (req, res) {
	res.render('index', {
		request: req
	});
};
