'use strict'
module.exports = (sequelize, DataTypes) => {
    const organizationUser = sequelize.define('organizationUser', {
        organizationUserId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        authority: {
            type: DataTypes.STRING,
            allowNull: false,
            type: DataTypes.ENUM('ORG_ADMIN', 'ORG_USER'),
        },
    },
        {
            hooks: {
            }

        })


    organizationUser.associate = function (models) {
        organizationUser.belongsTo(models.organizations, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            allowNull: false
        });
        organizationUser.belongsTo(models.users, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            allowNull: false
        });
    }
    return organizationUser;
}
