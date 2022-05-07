

//const { nanoid } = require('nanoid');
//const { dbcon } = require('../config/connection-db');
const { Grupo, GrupoDAO } = require('../models/grupo');
const { MensagemDAO } = require('../models/mensagem');
const { UsuarioDAO } = require('../models/usuario');

class GruposController {

   async cadastrar(req, res) {
console.log(req.body)
console.log(req.session.user)

const { nome } = req.body;
        
const grupo = new Grupo(null, nome);
await GrupoDAO.cadastrar(nome, req.session.user);
//await GrupoDAO.cadastrarAdmin(grupo, req.session.user)
 
return res.redirect('/');
    }

    async listar(req, res) {
        // const total = await GrupoDAO.totalGrupos(); para fazer paginação
        //const result = await dbcon.query('SELECT * FROM grupo');
        //console.log({ result });
        let { page } = req.query;
        console.log({ page });
        page = page || 1;
        const limit = 5;
        const offset = limit * (page - 1);
    
        const grupos = await GrupoDAO.listar(limit,offset) //Image.findAll({ offset, limit });
        console.log(grupos);
        const total = await GrupoDAO.contar()//Image.count();
        return res.render('tela-inicial', { user: req.session.user, grupos , total, page} )
      }


      async detalhar(req, res) {
        const idGrupo = req.params.id;
        const user = req.session.user;
        const grupo = await GrupoDAO.buscaPeloId(idGrupo);
        const mensagemGrupo = await MensagemDAO.mensagensGrupo(idGrupo);
        const membros = await UsuarioDAO.buscaUsuarioGrupo(idGrupo);
        const permissao = await UsuarioDAO.buscaPorPermissao(req.session.user.id, idGrupo);
        const cargo = await UsuarioDAO.buscaPorCargo(req.session.user.id, idGrupo);
        return res.render('detalhar-grupo', { user, cargo, membros, grupo, mensagens: mensagemGrupo, permissao })
    }
    

    async grupoUsuario(req, res) {
        const user = req.session.user;
       const grupos = await GrupoDAO.grupoUsuario(user.id);
      //  const grupos = await GrupoDAO.grupoUsuario(user.id);;
  // return res.send(grupos);
       return res.render('meus-grupos', { user: req.session.user, grupos: grupos })
    }

    async eliminarMembro(req, res) {
        const { id, idUser } = req.params;
        const grupo = await GrupoDAO.buscaPeloId(id);
        if (grupo) {
            const usuario = await UsuarioDAO.buscaPeloId(idUser);
            if (usuario) {
                await UsuarioDAO.eliminarMembro(id, idUser);
            }
        }
            res.redirect("/");
    }

}

module.exports = { GruposController }