import express from "express";
import * as AlunoController from "../controllers/aluno.js";
import * as FuncionarioController from "../controllers/funcionario.js";
import * as TurmaController from "../controllers/turma.js";
import * as AuthController from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const router = express.Router();

// Middleware para proteger rotas
function verifyToken(req, res, next) {
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(403).send({ message: "Nenhum token fornecido!" });
    }

    // Remover "Bearer " do token
    const bearerToken = token.split(" ")[1];

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Falha ao autenticar o token." });
        }
        req.userId = decoded.id;
        next();
    });
}

// rotas publicas
router.post("/login", AuthController.login);
router.post("/funcionarios", FuncionarioController.create);

// rotas privadas
router.get("/funcionarios", verifyToken, FuncionarioController.findAll);
router.get("/funcionarios/:id", verifyToken, FuncionarioController.findOne);
router.put("/funcionarios/:id", verifyToken, FuncionarioController.updateOne);
router.delete("/funcionarios/:id", verifyToken, FuncionarioController.deleteOne);

router.post("/turmas", verifyToken, TurmaController.create);
router.get("/turmas", verifyToken, TurmaController.findAll);
router.get("/turmas/:id", verifyToken, TurmaController.findOne);
router.put("/turmas/:id", verifyToken, TurmaController.updateOne);
router.delete("/turmas/:id", verifyToken, TurmaController.deleteOne);

router.post("/alunos", verifyToken, AlunoController.create);
router.get("/alunos", verifyToken, AlunoController.findAll);
router.get("/alunos/:id", verifyToken, AlunoController.findOne);
router.put("/alunos/:id", verifyToken, AlunoController.updateOne);
router.delete("/alunos/:id", verifyToken, AlunoController.deleteOne);

export const routes = (app) => {
    app.use("/api", router);
};


