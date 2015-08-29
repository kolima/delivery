'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('contactUs', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		firstName: {
			type: DataTypes.STRING(45),
			allowNull: false
		},

		lastName: {
			type: DataTypes.STRING(45),
			allowNull: false
		},

		email: {
			type: DataTypes.STRING(45),
			allowNull: false
		},

		text: {
			type: DataTypes.STRING(1000),
			allowNull: false
		}
	}, {
		freezeTableName: true
	});
};
