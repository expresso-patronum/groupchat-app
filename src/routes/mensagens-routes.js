const { Router } = require('express');

const { MensagensController } = require('../controllers/mensagens-controller');

const routes = Router();

const mensagensController = new MensagensController();

routes.post('/:id/enviar', mensagensController.enviar);

module.exports = routes;