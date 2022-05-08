const { Router } = require('express');

const { GruposController } = require('../controllers/grupos-controller');

const routes = Router();

const gruposController = new GruposController();

routes.get('/user', gruposController.grupoUsuario);

routes.post('/cadastrar', gruposController.cadastrar);

routes.get('/:id', gruposController.detalhar);

routes.get('/:id/elimina-membro/:idUser', gruposController.eliminarMembro);

routes.get('/:id/adicionar-membro', gruposController.mostraCadastroMembro);

routes.post('/:id/adicionar-membro', gruposController.cadastrarMembro);


module.exports = routes;