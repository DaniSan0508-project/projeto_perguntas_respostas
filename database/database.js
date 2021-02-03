const { Sequelize } = require('sequelize')
const sequelize = require('sequelize')

const connection  = new sequelize('perguntas','root','admin',{
    host: '127.0.0.1',
    dialect: 'mysql',
    port:3307
})

module.exports = connection