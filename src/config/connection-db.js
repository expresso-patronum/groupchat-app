const { Client } = require('pg')

const dbcon = new Client({
    connectionString: 'postgres://lnxqnvulcfbfcn:e4c666e39e3ae05f724d4a8fe59409e516e9be25722e1efdda64dbff32ff7549@ec2-3-231-82-226.compute-1.amazonaws.com:5432/d8a4kuhe2pc5nb',
    ssl: {
        rejectUnauthorized: false
    }
});

dbcon.connect(err => {
    if (err) {
        console.log("ERRO!!! NAO FOI POSSIVEL CONECTAR NO BANCO");
        console.log( { err });
    } else {
        console.log("BANCO CONECTADO COM SUCESSO");
    }
});

module.exports = {
    dbcon
}

