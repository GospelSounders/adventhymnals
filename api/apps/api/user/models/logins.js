'use strict'
/*
 * 
 * IP
 * device..
 * token...
 */
module.exports = (sequelize, DataTypes) => {
	const logins = sequelize.define('logins', {
		loginId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		logins: {
			type: DataTypes.DATE,
			allowNull: false
		},
		ip: {
			type: DataTypes.STRING,
			allowNull: false
		},
		browser: {
			type: DataTypes.STRING,
			allowNull: false
		},
		os: {
			type: DataTypes.STRING,
			allowNull: false
		},
		platform: {
			type: DataTypes.STRING,
			allowNull: false
		},
		token: {
			type: DataTypes.STRING(1024),
			allowNull: false
		},
		tokenExpiry: {
			type: DataTypes.DECIMAL(10),
			allowNull: false
		}
	},
		{
			hooks: {
			}

		})
	logins.associate = function (models) {
	    logins.belongsTo(models.users, {
	    	onDelete: "CASCADE",
	    	onUpdate: "CASCADE",
			allowNull: false
	    });

	}
	return logins;
}
