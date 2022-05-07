const { Router } = require('express');

const { GruposController } = require('../controllers/grupos-controller');

const routes = Router();

const gruposController = new GruposController();

//routes.get('/', gruposController.listar);

routes.get('/user', gruposController.grupoUsuario);

routes.post('/cadastrar', gruposController.cadastrar);

routes.get('/:id', gruposController.detalhar);

routes.get('/:id/elimina-membro/:idUser', gruposController.eliminarMembro);

//routes.post('/:id/adicionar-membro', gruposController.adicionaMembro);

//routes.get('/cadastrar', gruposController.mostraCadastro);

//routes.get('/deletar/:id', gruposController.deletar);


module.exports = routes;