import db from "../models/index.js";
const Aluno = db.alunos;

export function create(req, res, next) {
    const aluno = {
        nome: req.body.nome,
        email: req.body.email,
        idade: req.body.idade ?? null, 
        nota_primeiro_modulo: req.body.nota_primeiro_modulo ?? null,
        nota_segundo_modulo: req.body.nota_segundo_modulo ?? null,
        turma_id: req.body.turma_id ?? null,
        media: null
    };

    if (aluno.nota_primeiro_modulo !== null && aluno.nota_segundo_modulo !== null) {
        aluno.media = (aluno.nota_primeiro_modulo + aluno.nota_segundo_modulo) / 2;
    }

    Aluno.create(aluno)
        .then(data => {
            res.send(data);
        })
        .catch(next)
}

export function findAll(req, res) {
    res.send('funcionou')
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
