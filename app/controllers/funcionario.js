import db from "../models/index.js";
const Funcionario = db.funcionarios;

export function create(req, res) {
    const funcionario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        cargo: req.body.cargo
    };

    Funcionario.create(funcionario)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
            const messages = err.errors.map(e => e.message);
            res.status(400).send({
            message: messages[0]
            });
        } else {
            res.status(500).send({
            message: err.message || "Ocorreu um erro ao criar o Funcionário."
            });
        }
        });
};

export function findAll(_, res) {
    Funcionario.findAll({
        attributes: {
            exclude: ['senha', 'createdAt', 'updatedAt'] 
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao listar os Funcionários."
            });
        });
}

export function findOne(req, res) {
    // implementar
}

export function updateOne(req, res) {
    // implementar
}

export function deleteOne(req, res) {
    // implementar
}
