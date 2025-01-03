import express from "express";
import swaggerjsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import db from "./app/models/index.js";
import { routes } from "./app/routes/index.js"

// config base swagger
const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'EduDataHub API',
          description: 'API para gestão de dados escolares.',
          contact: {
               name: 'EduDataHub Team'
          },
      },
      servers: [
          {
            url: process.env.SERVER_SWAGGER || "http://localhost:8080",
          }
      ],
  },
  apis: ['./swaggerDocs.yml']
}

const app = express();

// config documentacao
const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

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

// apaga as tabelas se elas já existirem
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// rota simples raiz da aplicação
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo(a)." });
});

// importa rotas
routes(app);

// tratamento de erros global
app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      const messages = err.errors.map(e => e.message);
      res.status(400).send({ message: messages[0] });
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    res.status(400).send({
        message: "O turma_id informado não existe na tabela turmas."
    });
  } else {
      res.status(500).send({ message: err.message || "Ocorreu um erro no servidor." });
  }
});

// definindo portas e escutando as solicitações
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
