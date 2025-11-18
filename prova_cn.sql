create database db_Michell;

use db_MIchell;

CREATE TABLE alunos (
    id_aluno INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    usuario_acesso VARCHAR(50) NOT NULL UNIQUE,
    senha_hash CHAR(60) NOT NULL,
    email_aluno VARCHAR(120) NOT NULL UNIQUE,
    CHECK (email_aluno REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
    observacao VARCHAR(500) NULL,
    data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    foto LONGBLOB NULL
);


show tables;

select * from alunos;
