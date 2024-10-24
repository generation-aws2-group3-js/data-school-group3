import db from "../models/index.js";
const Turma = db.turmas;
const Aluno = db.alunos;

export function create(req, res, next) {
    const turma = {
        nome: req.body.nome,
        instrutor: req.body.instrutor
    };

    Turma.create(turma)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(next);
}

export function findAll(req, res) {
    Turma.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        order: [['id', 'ASC']]
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao listar os Funcionários."
            });
        });
}

export function findOne(req, res) {
    const id = req.params.id;

    Turma.findByPk(id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Aluno,
            as: 'alunos',
            attributes: ['id', 'nome', 'nota_primeiro_modulo', 'nota_segundo_modulo', 'media']
        }]
    })
        .then(data => {
            if (!data) return res.status(404).send({ message: "Turma não encontrada." });

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao buscar a Turma."
            });
        });
}

export function updateOne(req, res, next) {
    const id = req.params.id;

    Turma.findByPk(id)
        .then(data => {
            if (!data) return res.status(404).send({message: "Turma não encontrada."});

            const updatedData = {};

            if (req.body.nome) updatedData.nome = req.body.nome;
            if (req.body.instrutor) updatedData.instrutor = req.body.instrutor;
            
            return Turma.update(updatedData, {
                where: { id: id },
                returning: true
            });
        })
        .then(([_, [updatedTurma]]) => {
            const {createdAt, updatedAt, ...turmaSemCamposSensiveis } = updatedTurma.toJSON();

            const changedFields = Object.keys(req.body).filter(key => req.body[key] !== undefined);
            const message = `Turma atualizada com sucesso. | Campos atualizados: ${changedFields.join(', ')}.`;

            res.status(200).send({
                message,
                turma: turmaSemCamposSensiveis
            });
        })
        .catch(next);
}

export function deleteOne(req, res) {
    const id = req.params.id;

    Turma.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted === 0) return res.status(404).send({ message: "Turma não encontrada." });

            res.status(204).send();
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao excluir a turma."
            });
        });
}
