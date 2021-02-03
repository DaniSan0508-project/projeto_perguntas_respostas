const Sequelize = require('sequelize')
const connection = require('./database')


const Resposta = connection.define('resposta',{
    corpo:{
        type:Sequelize.TEXT,
        allowNull:true
    },
    perguntaId:{
        type:Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force:false}) // pode regravar abela mesmo se ela ja existe, sincroniza com banco de dados

module.exports = Resposta