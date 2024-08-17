const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('fashion', 'root', null, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false
});

const cons = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection database successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default cons;