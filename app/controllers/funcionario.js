import db from "../models/index.js";
import bcrypt from "bcrypt"; // Importa bcrypt para verificar a senha
import jwt from "jsonwebtoken"; // Importa jsonwebtoken para gerar o token

const Funcionario = db.funcionarios;

export function login(req, res) {
    const { email, senha } = req.body;

    Funcionario.findOne({ where: { email } })
        .then(funcionario => {
            if (!funcionario) {
                return res.status(401).json({ message: "Email ou senha inválidos." });
            }

            // Verifica se a senha está correta
            const isValidPassword = bcrypt.compareSync(senha, funcionario.senha);
            if (!isValidPassword) {
                return res.status(401).json({ message: "Email ou senha inválidos." });
            }

            // Gera um token JWT
            const token = jwt.sign({ id: funcionario.id, email: funcionario.email }, process.env.JWT_SECRET, {
                expiresIn: "3h" // O token expira em 3 horas
            });

            // Retorna o token e uma mensagem de sucesso
            res.status(200).json({ message: "Login bem-sucedido!", token });
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Erro ao realizar login." });
        });
}

export function create(req, res, next) {
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
        .catch(next);
}

export function findAll(_, res) {
    Funcionario.findAll({
        attributes: {exclude: ['senha', 'createdAt', 'updatedAt']},
        order: [['id', 'ASC']]
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
    const id = req.params.id;

    Funcionario.findByPk(id, {
        attributes: {exclude: ['senha', 'createdAt', 'updatedAt']}
    })
        .then(data => {
            if (!data) return res.status(404).send({ message: "Funcionário não encontrado." });

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao buscar o Funcionário."
            });
        });
}

export function updateOne(req, res, next) {
    const id = req.params.id;

    Funcionario.findByPk(id)
        .then(data => {
            if (!data) return res.status(404).send({message: "Funcionário não encontrado."});

            const updatedData = {};

            if (req.body.nome) updatedData.nome = req.body.nome;
            if (req.body.email) updatedData.email = req.body.email;
            if (req.body.cargo) updatedData.cargo = req.body.cargo;
            if (req.body.senha) updatedData.senha = req.body.senha;

            return Funcionario.update(updatedData, {
                where: { id: id },
                returning: true
            });
        })
        .then(([_, [updatedFuncionario]]) => {
            const { senha, createdAt, updatedAt, ...funcionarioSemCamposSensiveis } = updatedFuncionario.toJSON();

            const changedFields = Object.keys(req.body).filter(key => req.body[key] !== undefined);
            const message = `Funcionário atualizado com sucesso. | Campos atualizados: ${changedFields.join(', ')}.`;

            res.status(200).send({
                message,
                funcionario: funcionarioSemCamposSensiveis
            });
        })
        .catch(next);
}

export function deleteOne(req, res) {
    const id = req.params.id;

    Funcionario.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted === 0) return res.status(404).send({ message: "Funcionário não encontrado." });

            res.send({ message: "Funcionário excluído com sucesso." });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao excluir o Funcionário."
            });
        });
}
