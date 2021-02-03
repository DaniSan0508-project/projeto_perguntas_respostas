const Sequelize = require('sequelize')
const connection = require('./database')

const Pergunta = connection.define('pergunta',{//cria o SKEMA
    titulo:{
        type:Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type:Sequelize.STRING,
        allowNull: false
    }
})

Pergunta.sync({force:false}).then(()=>{
    console.log('Tabela criada')
}).catch(err=>{
    console.log(err)
}) // cria a tabela e se ela existir nao cria 

module.exports = Pergunta
