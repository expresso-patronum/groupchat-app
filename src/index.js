const express = require('express');
const app = express();
const { Grupo, GrupoDAO } = require('./models/grupo');
app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, 
    saveUninitialized: false,
    cookie: { secure: false }
}))


app.use(express.static('public'));

app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);
    next();
})


app.get('/', async (req, res) => {
    let { page } = req.query;
    console.log({ page });
    page = page || 1;
    const limit = 5;
    const offset = limit * (page - 1);

    const grupos = await GrupoDAO.listar(limit,offset);
    const total = await GrupoDAO.contar();
    return res.render('tela-inicial', { user: req.session.user, grupos , total, page} )
});
app.use(express.static('public'));

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