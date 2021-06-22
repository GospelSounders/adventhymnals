'use strict'
module.exports = (sequelize, DataTypes) => {
	const passwordCode = sequelize.define('passwordCode', {
		codeId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		code: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '{}',
		},

	},
		{
			hooks: {
			}

		})
	passwordCode.associate = function (models) {
	    passwordCode.belongsTo(models.users, {
	    	onDelete: "CASCADE",
	    	onUpdate: "CASCADE",
			allowNull: false
	    });

	}
	return passwordCode;
}
