import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models/index.js";

const Funcionario = db.funcionarios;

export function login(req, res) {
    const { email, senha } = req.body;

    Funcionario.findOne({ where: { email } })
        .then(funcionario => {
            if (!funcionario) {
                return res.status(401).json({ message: "Email ou senha inválidos." });
            }

            const isValidPassword = bcrypt.compareSync(senha, funcionario.senha);
            if (!isValidPassword) {
                return res.status(401).json({ message: "Email ou senha inválidos." });
            }

            const token = jwt.sign({ id: funcionario.id, email: funcionario.email }, process.env.JWT_SECRET, {
                expiresIn: "3h"
            });

            res.status(200).json({ message: "Login bem-sucedido!", token });
        })
        .catch(err => {
            res.status(500).json({ message: err.message || "Erro ao realizar login." });
        });
}

