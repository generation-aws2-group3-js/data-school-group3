import express from "express";
import * as AlunoController from "../controllers/aluno.js";
import * as FuncionarioController from "../controllers/funcionario.js";
import * as TurmaController from "../controllers/turma.js";

const router = express.Router();

router.post("/alunos", AlunoController.create);
router.get("/alunos", AlunoController.findAll);
router.get("/alunos/:id", AlunoController.findOne);
router.put("/alunos/:id", AlunoController.updateOne);
router.delete("/alunos/:id", AlunoController.deleteOne);

router.post("/funcionarios", FuncionarioController.create);
router.get("/funcionarios", FuncionarioController.findAll);
router.get("/funcionarios/:id", FuncionarioController.findOne);
router.put("/funcionarios/:id", FuncionarioController.updateOne);
router.delete("/funcionarios/:id", FuncionarioController.deleteOne);

router.post("/turmas", TurmaController.create);
router.get("/turmas", TurmaController.findAll);
router.get("/turmas/:id", TurmaController.findOne);
router.put("/turmas/:id", TurmaController.updateOne);
router.delete("/turmas/:id", TurmaController.deleteOne);

export const routes = (app) => {
  app.use("/api", router);
};
