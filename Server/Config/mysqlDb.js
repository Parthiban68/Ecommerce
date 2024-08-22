const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_password,
    {
        host: process.env.db_host,
        dialect: 'mysql',
        logging: false
    })

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('Mysql Connected');
    } catch (error) {
        console.error("Unable to connect database");

    }
}

module.exports = { connectDb, sequelize };