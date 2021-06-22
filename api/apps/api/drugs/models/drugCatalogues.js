'use strict'
module.exports = (sequelize, DataTypes) => {
    const drugCatalogue = sequelize.define('drugCatalogues', {
        drugCatalogueId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        brandName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 32],
                    msg: 'Please give us a correct brandName'
                }
            }
        },
        drugName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 32],
                    msg: 'Please give us a correct drugName'
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 32],
                    msg: 'Please give us a correct description'
                }
            }
        },
        imageFileName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 32],
                    msg: 'Please give us a correct description'
                }
            }
        },
        pregnancyCategory: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        requiresPrescription: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        },
    },
        {
            hooks: {
            }

        })


    drugCatalogue.associate = function (models) {
        // drugCatalogue.belongsTo(models.apiLevelOne, {
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
        drugCatalogue.belongsTo(models.drugAPIs, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
        drugCatalogue.belongsTo(models.drugCategories, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
        // drugCatalogue.belongsTo(models.formulations, {
        //     onDelete: "CASCADE",
        //     onUpdate: "CASCADE",
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });
    }

    return drugCatalogue;
}
