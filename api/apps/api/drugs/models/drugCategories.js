'use strict'
module.exports = (sequelize, DataTypes) => {
	const drugCategory = sequelize.define('drugCategories', {
		drugCategoryId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 32],
					msg: 'Please give us a correct drug category'
				}
			}
		},
		categoryLowerCase: {
			type: DataTypes.STRING,
			allowNull: false
		},
		verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
	},
		{
			hooks: {
			}

		})


	drugCategory.associate = function (models) {
		drugCategory.hasMany(models.apiLevelOne, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
		drugCategory.hasMany(models.drugCatalogues, {
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			foreignKey: {
				allowNull: false
			}
		});
	}

	return drugCategory;
}
