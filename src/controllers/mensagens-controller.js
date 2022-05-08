const { Mensagem, MensagemDAO } = require('../models/mensagem');

class MensagensController {

    async enviar(req, res) {
        const { id } = req.params;
        const mensagemBody = req.body;
        const mensagem = new Mensagem(null, mensagemBody.mensagem, req.session.user.id, id, null);
        await MensagemDAO.cadastrar(mensagem);
        return res.redirect(`/grupos/${id}`);
    }

}

module.exports = { MensagensController }