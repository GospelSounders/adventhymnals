'use strict'
module.exports = (sequelize, DataTypes) => {
	const password = sequelize.define('password', {
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '{}',
		},

	},
		{
			hooks: {
			}

		})
	password.associate = function (models) {
	    password.belongsTo(models.users, {
	    	onDelete: "CASCADE",
	    	onUpdate: "CASCADE",
			allowNull: false
	    });

	}
	return password;
}
