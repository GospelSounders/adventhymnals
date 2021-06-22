'use strict'
module.exports = (sequelize, DataTypes) => {
    const facilityUser = sequelize.define('facilityUser', {
        facilityUserId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        authority: {
            type: DataTypes.STRING,
            allowNull: false,
            type: DataTypes.ENUM('FACILITY_ADMIN', 'FACILITY_USER'),
        },
    },
        {
            hooks: {
            }

        })


    facilityUser.associate = function (models) {
        facilityUser.belongsTo(models.facilities, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            allowNull: false
        });
        facilityUser.belongsTo(models.users, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            allowNull: false
        });
    }
    return facilityUser;
}
