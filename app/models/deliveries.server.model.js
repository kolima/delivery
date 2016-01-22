'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('deliveries', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        location: {
            type: DataTypes.GEOMETRY('Point'),
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
};
