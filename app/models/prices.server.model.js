/**
 * Created by britishd on 29.01.16.
 */

'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('prices', {
		uid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		type : {
			type : DataTypes.STRING(50),
			allowNull: false
		},
		price : {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});
};
