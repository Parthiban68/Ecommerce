const Sequelize = require('sequelize');
const {sequelize} = require('../../Config/mysqlDb')

const getUser = async () =>{
    return sequelize.query('SELECT * FROM sakila.actor', { type: Sequelize.QueryTypes.SELECT });
}

module.exports = {getUser}

