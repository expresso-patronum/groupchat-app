const bcrypt = require('bcrypt');
const { compareSync } = require('bcrypt');
const { dbcon } = require('../config/connection-db');
const { Usuario, UsuarioDAO } = require('../models/usuario');

class UsersController {
    async cadastrar(req, res) {
        console.log(`Cadastrando um usuário`);
        console.log({ body: req.body });

        const { nome, email, senha } = req.body;

        const usuario = new Usuario(null, nome, email, senha);
        await UsuarioDAO.cadastrar(usuario);

        return res.redirect('/');
    }


    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const user = await UsuarioDAO.buscaPeloEmail(email);
            if (user) {
                const senhaCrypt = user.senha;
                const confere = compareSync(senha, senhaCrypt);
                if (confere) {
                    req.session.user = user;
                    //res.send('Login feito com sucesso!');
                    return res.redirect('/');
                }
                else  return res.render('erro', {erro: 'Senha errada'});
            }
            else return res.render('erro', {erro: 'Usuário não existe'});
        } 
        catch (error) {
            return res.render('erro');
        } 
    }

    async mostraLogin(req, res) {
        return res.render('login');
    }

    async mostraCadastro(req, res) {
        return res.render('cadastro', {});
    }

    async logout(req, res) {
        req.session.destroy();
        return res.redirect('/');
    }
}


module.exports = UsersController;