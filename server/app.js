const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const alunosRoutes = require("./routes/alunos");
app.use("/api/alunos", alunosRoutes);

// Inicializar servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
