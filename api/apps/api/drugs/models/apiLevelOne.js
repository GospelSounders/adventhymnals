'use strict'
module.exports = (sequelize, DataTypes) => {
    const apiLevelOne = sequelize.define('apiLevelOne', {
        apiLevelOneId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        api: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 32],
                    msg: 'Please give us a correct api level 1 name'
                }
            }
        },
        apiLowerCase: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 32],
                    msg: 'Please give us a correct api level 1 name'
                }
            }
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


    apiLevelOne.associate = function (models) {
        apiLevelOne.belongsTo(models.drugCategories, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });

        apiLevelOne.hasMany(models.apiLevelTwo, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }

    return apiLevelOne;
}
