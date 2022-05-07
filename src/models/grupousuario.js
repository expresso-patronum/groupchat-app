const { dbcon } = require("../config/connection-db");
const { GrupoDAO } = require("../models/grupo");
const { UsuarioDAO } = require("../models/usuario");

class GrupoUsuario {
    constructor(id, nome) {
        this.id = id;
        this.usuario = usuario;
        this.grupo = grupo;
        this.cargo = cargo;
        this.permissao = permissao;
    }
}

class GrupoUsuarioDAO {

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