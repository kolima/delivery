/**
 * Created by britishd on 21.01.16.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		login: {
			type: DataTypes.STRING(25),
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING(1500),
			allowNull: false
		},
		salt : {
			type: DataTypes.STRING(1500),
			allowNull: false
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(40),
			allowNull: false,
			unique: true
		},
		facebook_id : {
			type: DataTypes.STRING
		},
		facebook_access_token : {
			type: DataTypes.STRING(1500)
		},
		reset_token : {
			type: DataTypes.STRING(1500),
			allowNull: false
		}
	},{
		freezeTableName: true
	});
};
