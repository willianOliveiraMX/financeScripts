const { DataTypes } = require('sequelize');

exports.module_debt_group = function (connection) {
    return DebtGroup = connection.define('debt_group', {
        id: { 
           type: DataTypes.NUMBER,
           allowNull: false,
           primaryKey: true
        },
        description: {
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
        },
        token_chatid: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false
    });
}