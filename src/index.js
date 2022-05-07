const express = require('express');
const app = express();
const { Grupo, GrupoDAO } = require('./models/grupo');
app.set('view engine', 'ejs');
app.set('views', './src/view');

// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true,
}));

// PARSER DAS REQUISIÇOES COM JSON
app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, // NAO SOBRESCREVER CASO NAO HAJA MODIFICAÇÕES,
    saveUninitialized: false,
    cookie: { secure: false }
}))


app.use(express.static('public'));

/* 
SEMPRE QUE UTILIZAMOS APP.USE ESTAMOS INCLUINDO UM MIDDLEWARE !!!
MIDDLEWARE É UMA FUNÇÃO QUE EXECUTA ENTRE O REQUEST E O ENDPOINT FINAL, PERMITINDO QUE SEJA VERIFICADO, INCLUIDO, TESTADO, QUALQUER CÓDIGO, ANTES DE "PASSAR PARA FRENTE" NEXT() FUNCTION
*/
app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);

    // atrasando o usuario kkkkk
    // setTimeout(() => next(), 1000);
    next();
})


app.get('/', async (req, res) => {
    let { page } = req.query;
    console.log({ page });
    page = page || 1;
    const limit = 5;
    const offset = limit * (page - 1);

    const grupos = await GrupoDAO.listar(limit,offset) //Image.findAll({ offset, limit });
    console.log(grupos);
    const total = await GrupoDAO.contar()//Image.count();
    return res.render('tela-inicial', { user: req.session.user, grupos , total, page} )
});
app.use(express.static('public'));
//app.use('/assets', express.static('assets'));
//aqui

const usersRoutes = require('./routes/users-routes');
app.use('/users', usersRoutes);

const gruposRoutes = require('./routes/grupos-routes');
app.use('/grupos', gruposRoutes);


const mensagensRoutes = require('./routes/mensagens-routes');
app.use('/mensagens', mensagensRoutes);
app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Sorry, not found!!!</h1>
        <a href="/">VOLTAR</a>
    `);
})

const dbcon = require('./config/connection-db');
console.log(dbcon);

const PORT = process.env.PORT || 3000;
console.log({PORT});
app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}`));