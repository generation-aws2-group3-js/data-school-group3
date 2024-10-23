import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/database.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  port: 5433,
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

export default db;