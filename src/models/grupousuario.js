const { dbcon } = require("../config/connection-db");
const { GrupoDAO } = require("../models/grupo");
const { UsuarioDAO } = require("../models/usuario");

class GrupoUsuario {
    constructor(id, usuario, grupo, cargo, permissao) {
        this.id = id;
        this.usuario = usuario;
        this.grupo = grupo;
        this.cargo = cargo;
        this.permissao = permissao;
    }
}

class GrupoUsuarioDAO {

    static async buscaPorEmailId(email) {
        const sql= 'SELECT usuario.id FROM usuario WHERE email= $1';
        const result = await dbcon.query(sql, [email]);
        const rows = result.rows;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
        }
        if(row != undefined) {
        return row.id;
    } else {
        return null;
    }
    }

    static async buscaPorMembro(idGrupo, idUser) {
        const sql = 'SELECT * FROM grupousuario WHERE grupo = $1 AND usuario = $2';
        const result = await dbcon.query(sql, [idGrupo, idUser]);
        
        if (result.rows[0]) {
            const grupoUsuario = new GrupoUsuario(result.rows[0].id, result.rows[0].idUser, result.rows[0].idGrupo, result.rows[0].cargo, result.rows[0].permissao);
            return grupoUsuario;
        } else {
            return null;
        }
    }

    static async cadastrar(grupoUsuario) {
    const sql = 'INSERT INTO grupousuario (usuario, grupo, cargo, permissao) VALUES ($1, $2, $3, $4);';
    const values = [grupoUsuario.usuario, grupoUsuario.grupo, grupoUsuario.cargo, grupoUsuario.permissao];

    try {
        await dbcon.query(sql, values);
    } catch (error) {
        console.log({ error });
    }
}

}

module.exports = {
    GrupoUsuario,
    GrupoUsuarioDAO
};