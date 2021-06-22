'use strict'
module.exports = (sequelize, DataTypes) => {
    const apiLevelTwo = sequelize.define('apiLevelTwo', {
        apiLevelTwoId: {
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
                    msg: 'Please give us a correct api level 2 name'
                }
            }
        },
        apiLowerCase: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 32],
                    msg: 'Please give us a correct api level 2 name'
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


    apiLevelTwo.associate = function (models) {
        apiLevelTwo.belongsTo(models.apiLevelOne, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
        apiLevelTwo.hasMany(models.drugAPIs, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    }

    return apiLevelTwo;
}
