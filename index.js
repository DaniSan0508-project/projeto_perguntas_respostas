const express = require('express');//facilita a aberturado banco com node
const PORTA = 3000;
const app = express();
const bodyParser = require('body-parser')//le o corpo dos foemularios
const connection = require('./database/database')//sequelize , conectar ao mySql
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

connection.authenticate()
    .then(()=>{
        console.log("MySql conectado")
    }).catch(err=>{
        console.log(err)
    })


app.set('view engine','ejs');//Setando para o express o ejs como engine visual , que vai fazer a ligação com o HTML

app.use(express.static('public'))//Setando para o express ler arquivos estaticos,html,imagens,css
app.use(bodyParser.urlencoded({extended:false}))//decifra o que o corpo da requisição manda, nos formularios
app.use(bodyParser.json())

app.get('/',(req,res)=>{//através do render , o express visualiza a pasta views e procura pelo arquivo descrito
    
        Pergunta.findAll({raw:true,order:[
            ['id','DESC']//mudar para ordem decrescente   ACS - crecente DESC - decresccente , titulo ou id
        ]}).then(pergunta=>{
        res.render('index',{//renderiza o index, e manda as perguntas pegas no MySql para a index
            perguntas:pergunta
        })
    })
   
})

app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})

app.post('/salvarpergunta',(req,res)=>{
    let tituloForm = req.body.titulo
    let descricaoForm = req.body.descricao
    Pergunta.create({//faz a função do inserto to , insere a tabela 
        titulo:tituloForm,
        descricao:descricaoForm
    }).then(()=>{
        res.redirect("/")
    }).catch(err=>{
        res.send("Erro ao enviar pergunta")
    })
})

app.get('/pergunta/:id',(req,res)=>{//captura o id e procura no bd se id existe atraves de params, se existir renderiza a pagina
    let id = req.params.id
    Pergunta.findOne({
        where:{id:id}
    }).then(pergunta=>{
        if(pergunta != undefined){
            Resposta.findAll({where:{perguntaId:pergunta.id},
                order:[['id','DESC']]
            }).then(respostas=>{
                res.render('pergunta',{//<--- envia a variavel pergunta para a pagina renderizada
                pergunta:pergunta,
                respostas:respostas
            })
        })
        }else{
            res.redirect('/')
        }
    })
})

app.post('/responder',(req,res)=>{
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta
    Resposta.create({
        corpo:corpo,
        perguntaId:perguntaId
    }).then(()=>{
        res.redirect('/pergunta/'+ perguntaId)
    })
})

app.listen(PORTA,()=>{
    console.log(`Servidor rodando na porta ${PORTA}`)
});


