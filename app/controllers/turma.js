import db from "../models/index.js";
const Turma = db.turmas;

export function create(req, res, next) {
    const turma = {
        nome: req.body.nome,
        instrutor: req.body.instrutor
    };

    Turma.create(turma)
        .then(data => {
            res.send(data);
        })
        .catch(next);
}

export function findAll(req, res) {
    // implementar
}

export function findOne(req, res) {
    // implementar
}

export function updateOne(req, res, next) {
    // implementar
}

export function deleteOne(req, res) {
    // implementar
}
