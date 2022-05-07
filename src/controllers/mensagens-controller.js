const { Mensagem, MensagemDAO } = require('../models/mensagem');
const { Grupo, GrupoDAO } = require('../models/grupo');

class MensagensController {

    async enviar(req, res) {
        const { id } = req.params;
        const mensagemBody = req.body;
        console.log(mensagemBody.mensagem, req.session.user.id, id, null);
        const mensagem = new Mensagem(null, mensagemBody.mensagem, req.session.user.id, id, null);
        await MensagemDAO.cadastrar(mensagem);
        return res.redirect(`/grupos/${id}`);
    }

}

module.exports = { MensagensController }