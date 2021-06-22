'use strict'
module.exports = (sequelize, DataTypes) => {
	const activationCode = sequelize.define('activationCode', {
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
	activationCode.associate = function (models) {
	    activationCode.belongsTo(models.users, {
	    	onDelete: "CASCADE",
	    	onUpdate: "CASCADE",
			allowNull: false
	    });

	}
	return activationCode;
}
