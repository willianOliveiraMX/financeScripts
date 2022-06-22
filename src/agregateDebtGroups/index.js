const { Sequelize } = require('sequelize');
const { agregateDebtGroups } = require('./agregateDebtGroups');
const { createGroups } = require('./createGroups');

async function init() {
    const sequelize = new Sequelize('personal_finance', 'postgres', '123', {
        host: 'localhost',
        dialect: 'postgres',
        define: {
            freezeTableName: true
        }
    });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const newDebts = await agregateDebtGroups(sequelize, '1678239401');
        createGroups(sequelize, '1678239401', newDebts);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

init();
