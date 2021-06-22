'use strict'
module.exports = (sequelize, DataTypes) => {
	const organization = sequelize.define('organizations', {
		organizationId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		organizationName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [2, 32],
					msg: 'Please give us a correct organization name with atleast two characters'
				}
			}
		}, organizationNameLowerCase: {
			type: DataTypes.STRING,
			allowNull: false
		},
	},
		{
			hooks: {
			}

		})

	organization.associate = function (models) {
		organization.belongsTo(models.users, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			allowNull: false
		});
		organization.hasMany(models.organizationUser, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			allowNull: false
		});
		organization.hasMany(models.facilities, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			allowNull: false
		});
	}
	return organization;
}
