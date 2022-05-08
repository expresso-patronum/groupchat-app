const { dbcon } = require("../config/connection-db");

class Grupo {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

class GrupoDAO {

static async cadastrar(nome, user){
    const sql1= 'INSERT INTO public.grupo(nome) values ($1)';
 const sql2 = 'SELECT grupo.id FROM grupo WHERE ID = (SELECT MAX(ID) FROM grupo)';
    const result1 = await dbcon.query(sql1, [nome]);
  const result2 = await dbcon.query(sql2);//
  const ultimoId= result2.rows[0].id;
  console.log(ultimoId)
   const sql3=  "INSERT INTO grupousuario(grupo, usuario, cargo, permissao) values ($1, $2, 'admin','LE')";
const result3= await dbcon.query(sql3, [ultimoId, user.id]);

}

    static async listar(limit, offset) { 
        const sql = 'SELECT p.id, p.nome, (SELECT COUNT(*) FROM grupousuario p2 WHERE p2.grupo = p.id) AS qt FROM grupo p LEFT JOIN grupousuario p3 ON p3.grupo = p.id GROUP BY p.id LIMIT 5 OFFSET $1';

        const result = await dbcon.query(sql, [offset]);
     return result.rows; 
    } 


    static async contar(){
        const sql = 'SELECT COUNT(*) FROM grupo;'
        const result= await dbcon.query(sql);
        console.log(result.rows)
        return result.rows[0].count;

    }
    static async buscaPeloId(id) {
        const sql = 'SELECT grupo.id, grupo.nome FROM grupo where id = $1';
        const result = await dbcon.query(sql, [id]);
        const grupo = result.rows[0];
        return grupo;
    }

    static async grupoUsuario(id) {
       const sql = 'select grupo.nome, grupo.id, usuario.id as idUser, upper(grupousuario.cargo) as cargo, grupousuario.permissao from grupousuario join grupo on grupousuario.grupo = grupo.id join usuario on grupousuario.usuario = usuario.id where usuario.id = $1';
       
       const result = await dbcon.query(sql, [id]);
        return result.rows;
    }

    

}

module.exports = {
    Grupo,
    GrupoDAO
};