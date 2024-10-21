import express from "express";
import db from "./app/models/index.js";
import { routes } from "./app/routes/index.js"

const app = express();

// interpreta requisições do tipo json
app.use(express.json());

// conectando com banco de dados
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // apaga as tabelas se elas já existirem
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// rota simples raiz da aplicação
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo(a)." });
});

// importa rotas
routes(app);

// definindo portas e escutando as solicitações
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
