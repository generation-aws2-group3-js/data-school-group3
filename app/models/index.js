import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/database.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

import Alunos from "./alunos.js";
import Funcionarios from "./funcionarios.js";
import Turmas from "./turmas.js";

db.alunos = Alunos(sequelize, Sequelize);
db.funcionarios = Funcionarios(sequelize, Sequelize);
db.turmas = Turmas(sequelize, Sequelize);

db.alunos.belongsTo(db.turmas, {
  foreignKey: 'turma_id',
  as: 'turma',
  onDelete: 'SET NULL' // se a turma for deletada, ficará null no turma_id do aluno que antes era vinculado a turma
});
db.turmas.hasMany(db.alunos, {
  foreignKey: 'turma_id',
  as: 'alunos'
});

export default db;