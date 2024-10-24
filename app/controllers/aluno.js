import db from "../models/index.js";
const Aluno = db.alunos;
const Turma = db.turmas;

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
            res.status(201).send(data);
        })
        .catch(next)
}

export function findAll(req, res) {
    Aluno.findAll({
        attributes: {exclude: ['turma_id', 'createdAt', 'updatedAt']},
        order: [['id', 'ASC']], 
        include: [{model: Turma, as: 'turma', attributes: ['id', 'nome', 'instrutor']}]
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

    Aluno.findByPk(id, {
        attributes: {
            exclude: ['turma_id', 'createdAt', 'updatedAt']
        },
        include: [{model: Turma, as: 'turma', attributes: ['id', 'nome', 'instrutor']}]
    })
        .then(data => {
            if (!data) return res.status(404).send({ message: "Aluno não encontrado." });

            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao buscar o Aluno."
            });
        });
}

export function updateOne(req, res, next) {
    const id = req.params.id;

    Aluno.findByPk(id)
        .then(data => {
            if (!data) return res.status(404).send({message: "Aluno não encontrado."});

            const updatedData = {};

            if (req.body.nome) updatedData.nome = req.body.nome;
            if (req.body.email) updatedData.email = req.body.email;
            if (req.body.idade) updatedData.idade = req.body.idade;
            if (req.body.nota_primeiro_modulo) updatedData.nota_primeiro_modulo = req.body.nota_primeiro_modulo;
            if (req.body.nota_segundo_modulo) updatedData.nota_segundo_modulo = req.body.nota_segundo_modulo;
            if (req.body.turma_id) updatedData.turma_id = req.body.turma_id;
            
            const nota1 = updatedData.nota_primeiro_modulo ? updatedData.nota_primeiro_modulo : data.nota_primeiro_modulo;
            const nota2 = updatedData.nota_segundo_modulo ? updatedData.nota_segundo_modulo : data.nota_segundo_modulo;

            if (nota1 !== null && nota2 !== null) updatedData.media = (nota1 + nota2) / 2;

            return Aluno.update(updatedData, {
                where: { id: id },
                returning: true
            });
        })
        .then(([_, [updatedAluno]]) => {
            const { senha, createdAt, updatedAt, ...alunoSemCamposSensiveis } = updatedAluno.toJSON();

            const changedFields = Object.keys(req.body).filter(key => req.body[key] !== undefined);
            const message = `Aluno atualizado com sucesso. | Campos atualizados: ${changedFields.join(', ')}.`;

            res.status(200).send({
                message,
                aluno: alunoSemCamposSensiveis
            });
        })
        .catch(next);
}

export function deleteOne(req, res) {
    const id = req.params.id;

    Aluno.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted === 0) return res.status(404).send({ message: "Aluno não encontrado." });

            res.status(204).send({ message: "Aluno excluído com sucesso." });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao excluir o Aluno."
            });
        });
}
