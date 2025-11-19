const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
}

router.post("/", async (req, res) => {
    const { nome_completo, usuario_acesso, senha, email_aluno, observacao } = req.body;

    if (!nome_completo || !usuario_acesso || !senha || !email_aluno) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos." });
    }

    if (!validarEmail(email_aluno)) {
        return res.status(400).json({ message: "E-mail inválido." });
    }

    try {
        // Verifica se usuário ou e-mail já existem
        const [existe] = await pool.query(
            "SELECT id_aluno FROM alunos WHERE usuario_acesso = ? OR email_aluno = ?", 
            [usuario_acesso, email_aluno]
        );

        if (existe.length > 0) {
            return res.status(400).json({ message: "Usuário ou e-mail já cadastrados." });
        }

        // Hash seguro da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Inserção
        await pool.query(
            `INSERT INTO alunos 
            (nome_completo, usuario_acesso, senha_hash, email_aluno, observacao) 
            VALUES (?, ?, ?, ?, ?)`,
            [nome_completo, usuario_acesso, senhaHash, email_aluno, observacao || null]
        );

        res.status(201).json({ message: "Aluno cadastrado com sucesso!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno no servidor." });
    }
});

module.exports = router;