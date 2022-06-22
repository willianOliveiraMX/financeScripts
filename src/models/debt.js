const { DataTypes } = require('sequelize');

exports.module_debt = function (connection) {
    return Debt = connection.define('debt', {
        id: { 
           type: DataTypes.NUMBER,
           allowNull: false,
           primaryKey: true
        },
        token_chatid: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        monthid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        groupid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        updatedat: {
            type: DataTypes.TIME,
        },
        createdat: {
            type: DataTypes.TIME,
        },
        isvalid: {
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: false
    });
}