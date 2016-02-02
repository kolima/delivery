/**
 * Created by britishd on 27.01.16.
 */
"use strict";
var transporter = require('./config').transporter;
var tokens = require('./tokens');



module.exports.resetPasswordMail = function (data) {
	let link = 'http://localhost:3000/#/reset?token=' + data.reset_token;
	var mailOptions = {
		from: 'delivery admin <brenor01@gmail.com>', // sender address
		to: data.email, // list of receivers
		subject: 'Welcome in Delivery', // Subject line
		html : '<h2>Dear ' + data.name + '</h2><br><span>Write now your password is ' + data.password + '</span><p>If you wanna change it, please enter in you profile at your account!</span>'
	};
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
};


