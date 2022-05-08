

const { Grupo, GrupoDAO } = require('../models/grupo');
const { GrupoUsuario, GrupoUsuarioDAO } = require('../models/grupousuario');
const { MensagemDAO } = require('../models/mensagem');
const { UsuarioDAO } = require('../models/usuario');

class GruposController {

   async cadastrar(req, res) {

const { nome } = req.body;
        
const grupo = new Grupo(null, nome);
await GrupoDAO.cadastrar(nome, req.session.user);
 
return res.redirect('/');
}

    async listar(req, res) {
        let { page } = req.query;
        console.log({ page });
        page = page || 1;
        const limit = 5;
        const offset = limit * (page - 1);
    
        const grupos = await GrupoDAO.listar(limit,offset);
        const total = await GrupoDAO.contar();
        return res.render('tela-inicial', { user: req.session.user, grupos , total, page} )
      }


      async detalhar(req, res) {
        const idGrupo = req.params.id;
        const user = req.session.user;
        const grupo = await GrupoDAO.buscaPeloId(idGrupo);
        const membros = await UsuarioDAO.buscaUsuarioGrupo(idGrupo);
        const permissao = await UsuarioDAO.buscaPorPermissao(req.session.user.id, idGrupo);
        const cargo = await UsuarioDAO.buscaPorCargo(req.session.user.id, idGrupo);
        let { page } = req.query;
        console.log({ page });
        if (!page) {
            page = 1;
        }
        const limit = 10;
        const offset = limit * (page - 1);
        const total = await MensagemDAO.contar(idGrupo);
    
        const mensagemGrupo = await MensagemDAO.mensagensGrupo(idGrupo, offset, limit);

        return res.render('detalhar-grupo', { total, user, cargo, membros, grupo, mensagens: mensagemGrupo, permissao })
    }
    

    async grupoUsuario(req, res) {
       
       const grupos = await GrupoDAO.grupoUsuario(req.session.user.id);
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

    async mostraCadastroMembro(req,res){
        const {id} = req.params
        const user = req.session.user;    
        const grupo = await GrupoDAO.buscaPeloId(id);
      if(grupo) {
            res.render("adicionar-membro", {grupo, user});
    }
}

    async cadastrarMembro(req,res){
        const {id}= req.params;
        const { permissao, email } = req.body;
        const cargo = 'membro';
        const grupo = await GrupoDAO.buscaPeloId(id);

        if (grupo) {
            const idUser = await GrupoUsuarioDAO.buscaPorEmailId(email);
            const usuario = await UsuarioDAO.buscaPeloId(idUser);
        if(usuario) {
            const grupoUsuario = await GrupoUsuarioDAO.buscaPorMembro(id, idUser);

            if(grupoUsuario) {
                return res.render('erro', {erro: 'Esse usuário já é membro do grupo.'});
            } else {
         const grupoUsuario = new GrupoUsuario(null, idUser, id, cargo, permissao);
         GrupoUsuarioDAO.cadastrar(grupoUsuario);
         res.redirect('/');
            }
        }  else {
            return res.render('erro', {erro: 'Usuário não encontrado.'});
        }
    } else {
        res.redirect('/');
    }
}

}

module.exports = { GruposController }