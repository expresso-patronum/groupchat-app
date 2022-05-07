const { dbcon } = require("../config/connection-db");
const bcrypt = require('bcrypt');
const res = require("express/lib/response");

// postgres://mguhwyxzuehniz:513393b8847a572e661667b54ca6560f9da2239d6d569004b671a0580229af8f@ec2-52-54-212-232.compute-1.amazonaws.com:5432/dfoselo3bnj81h


class Usuario {
    constructor(id, nome, email, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

// DAO = DATA ACCESS OBJECT
class UsuarioDAO {

    static async buscaPeloEmail(email) {
        const sql = 'SELECT * FROM public.usuario where public.usuario.email = $1';
        const result = await dbcon.query(sql, [email]);
        const usuario = result.rows[0];
        return usuario;
    }

    static async buscaPeloId(id) {
        const sql = 'SELECT * FROM public.usuario where public.usuario.id = $1';
        const result = await dbcon.query(sql, [id]);
        const usuario = result.rows[0];
        return usuario;
    }


    static async cadastrar(usuario) {
        const sql = 'INSERT INTO public.usuario (nome, email, senha) VALUES ($1, $2, $3);';
        const senha = bcrypt.hashSync(usuario.senha, 10); 
        const values = [usuario.nome, usuario.email, senha];
        
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log('NÃO FOI POSSIVEL CADASTRAR!');
            console.log({ error });
        }
    }

    static async buscaPorPermissao(usuario, grupo) {
        const sql = "SELECT permissao FROM grupousuario WHERE usuario = $1 AND grupo = $2;"
        const result = await dbcon.query(sql, [usuario, grupo]);
        return result.rows[0].permissao;

    }

    static async eliminarMembro(grupo, usuario) {
        const sql = 'DELETE FROM grupousuario WHERE grupo = $1 AND usuario = $2';
        await dbcon.query(sql, [grupo, usuario]);
    }

    static async buscaPorCargo(usuario, grupo) {

        const sql = "SELECT cargo FROM grupousuario WHERE usuario = $1 AND grupo = $2;"
        const result = await dbcon.query(sql, [usuario, grupo]);
        return result.rows[0].cargo;
    }

    static async buscaUsuarioGrupo(id) {
        const sql = "SELECT usuario.id, grupo.nome, usuario.nome, CASE cargo WHEN 'admin' THEN '[administrador]' ELSE '' END AS cargo, CASE permissao WHEN 'SL' THEN '[leitor]' ELSE '[escritor]' END AS permissao FROM grupousuario JOIN usuario on usuario = usuario.id LEFT JOIN grupo ON grupo = grupo.id WHERE grupo = $1";
        const result = await dbcon.query(sql, [id]);
        return result.rows;
    }
}

module.exports = {
    Usuario,
    UsuarioDAO
};