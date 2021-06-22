'use strict'
module.exports = (sequelize, DataTypes) => {
	const drugAPI = sequelize.define('drugAPIs', {
		drugAPIId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		apiStrength: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [2, 32],
					msg: 'Please give us a correct apiStrength'
				}
			}
		}
	},
		{
			hooks: {
			}

		})


	drugAPI.associate = function (models) {
		drugAPI.belongsTo(models.apiLevelTwo, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
        });
        drugAPI.hasMany(models.drugCatalogues, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}

	return drugAPI;
}
