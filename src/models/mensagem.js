const { dbcon } = require("../config/connection-db");

class Mensagem {
    constructor(id, mensagem, usuario, grupo, horaedia) {
        this.id = id;
        this.mensagem = mensagem;
        this.usuario = usuario;
        this.grupo = grupo;
        this.horaedia = horaedia;
    }
}

class MensagemDAO {
    static async cadastrar(mensagem) {
        const sql = 'INSERT INTO mensagens (mensagem, usuario, grupo) VALUES ($1, $2, $3);';
        const values = [mensagem.mensagem, mensagem.usuario, mensagem.grupo];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log({ error });
        }
    }

    static async mensagensGrupo(id) {
        const sql = 'SELECT u.id as iduser, u.nome as nome, u.email as email, m.id as idmensagem, m.mensagem as mensagem, m.horaedia as horaedia FROM mensagens m JOIN usuario u ON u.id = m.usuario WHERE m.grupo = $1;';
        try {
            const result = await dbcon.query(sql, [id]);
            return result.rows;
        } catch (error) {
            console.log({ error });
        }
    }

    static async contar(){
        const sql = 'SELECT COUNT(*) FROM mensagens;'
        const result= await dbcon.query(sql);
        console.log(result.rows)
        return result.rows[0].count;

    }


}

module.exports = {
    Mensagem,
    MensagemDAO
};