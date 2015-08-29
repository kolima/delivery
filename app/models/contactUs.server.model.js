'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('contactUs', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},

		firstName: {
			type: DataTypes.STRING(45)
		},

		lastName: {
			type: DataTypes.STRING(45)
		},

		email: {
			type: DataTypes.STRING(45)
		},

		text: {
			type: DataTypes.STRING(1000)
		}
	}, {
		freezeTableName: true
	});
};
