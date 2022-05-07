CREATE TABLE usuario (
	id serial PRIMARY KEY,
	nome VARCHAR ( 500 ) NOT NULL,
    email VARCHAR ( 500 ) NOT NULL,
	senha VARCHAR ( 500 ) NOT NULL
);

CREATE TABLE grupo(
    id serial PRIMARY KEY,
    nome VARCHAR ( 500 ) NOT NULL,
   /* dono int NOT NULL,
    FOREIGN KEY (dono) REFERENCES usuario(id)*/
);

/* tipo do usuário */


CREATE TABLE grupousuario(
    id serial PRIMARY KEY,
    usuario int NOT NULL,
    grupo int NOT NULL,
    cargo VARCHAR(200), --membro / admin
    permissao VARCHAR(2), --SL Somente leitura LE leitura e escrita
     FOREIGN KEY (usuario) REFERENCES usuario(id),
     FOREIGN KEY (grupo) REFERENCES grupo(id)
);

CREATE TABLE mensagens(
    id serial PRIMARY KEY,
    mensagem VARCHAR(4000),
    usuario int NOT NULL,
    grupo int NOT NULL,
    horaedia TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (usuario) REFERENCES usuario(id),
     FOREIGN KEY (grupo) REFERENCES grupo(id)
);
 
INSERT INTO usuario(nome, email, senha)
VALUES ('adriele', 'adriele.colossi4@gmail','$2a$12$3trY40yVW.iZV.FroOqHTO4Q5vdOTIoMYbSutmm3K/tZLxA9g.azW'); --adriele é a senha
INSERT INTO usuario(nome, email, senha)
VALUES ('sabrina', 'sabrina@gmail','$2a$12$Y6/XBRqJi53WooifZCzfkO0pnnHr.EEmvMJwMntszbvedIpV0kuwy'); --adriele é a senha

INSERT INTO  grupo(nome)
VALUES ('Grupo da Adriele'); 


    INSERT INTO grupousuario(usuario, grupo, cargo, permissao) VALUES (1,1, 'admin', 'LE');

  INSERT INTO grupousuario(usuario, grupo, cargo, permissao) VALUES (7,30, 'membro', 'SL');
