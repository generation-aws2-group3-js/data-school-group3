import bcrypt from 'bcrypt';

export default (sequelize, Sequelize) => {
  const Funcionarios = sequelize.define("funcionarios", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O nome é obrigatório."
        },
        len: {
          args: [3, 150], // min 3 e max 150
          msg: "O nome deve ter pelo menos 3 caracteres."
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Esse email já foi cadastrado."
      },
      validate: {
        notNull: {
          msg: "O email é obrigatório."
        },
        isEmail: {
          msg: "O email inserido é inválido. Tente novamente."
        }
      }
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A senha é obrigatória."
        },
        len: {
          args: [6, 30],
          msg: "A senha deve ter pelo menos 6 caracteres."
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/,
          msg: "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
        }
      }
    },
    cargo: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O cargo é obrigatório."
        },
        notEmpty: {
          msg: "O cargo não pode ser uma string vazia."
        },
        len: {
          args: [5, 30],
          msg: "O cargo deve ter pelo menos 5 caracteres."
        }
      }
    }
  }, {
    hooks: {
      afterValidate: (funcionario) => {
        if (funcionario.senha) funcionario.senha = bcrypt.hashSync(funcionario.senha, 10);
    }
    }
  });

  return Funcionarios;
};
