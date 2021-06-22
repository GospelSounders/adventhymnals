'use strict'
module.exports = (sequelize, DataTypes) => {
	const facility = sequelize.define('facilities', {
		facilityId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		facilityName: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [2, 32],
					msg: 'Please give us a correct facility name with atleast two characters'
				}
			}
		}
		,facilityNameLowerCase: {
			type: DataTypes.STRING,
			allowNull: false
		},
		location: {
			type: DataTypes.GEOMETRY('POINT'),
			allowNull: false
		},
	},
		{
			hooks: {
			}

		})

	facility.associate = function (models) {
		facility.belongsTo(models.organizations, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			allowNull: false
		});
		facility.hasMany(models.facilityUser, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			allowNull: false
		});
	}
	return facility;
}
