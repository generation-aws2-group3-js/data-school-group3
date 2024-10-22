export default (sequelize, Sequelize) => {
  const Alunos = sequelize.define("alunos", {
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
          args: [3, 150],
          msg: "O nome deve ter pelo menos 3 caracteres. E no máximo 150 caracteres."
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
    idade: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: {
          msg: "A idade deve ser um número inteiro."
        },
        min: {
          args: [0],
          msg: "A idade deve ser um valor positivo."
        },
        max: {
          args: [120],
          msg: "A idade máxima permitida é de 120 anos."
        }
      }
    },
    nota_primeiro_modulo: {
      type: Sequelize.FLOAT,
      validate: {
        max: {
          args: [10.0],
          msg: "A nota do primeiro módulo deve ser no máximo 10.0."
        },
        isFloat: {
          msg: "A nota do primeiro módulo deve ser um número decimal."
        }
      }
    },
    nota_segundo_modulo: {
      type: Sequelize.FLOAT,
      validate: {
        max: {
          args: [10.0],
          msg: "A nota do segundo módulo deve ser no máximo 10.0."
        },
        isFloat: {
          msg: "A nota do segundo módulo deve ser um número decimal."
        }
      }
    },
    media: {
      type: Sequelize.FLOAT,
      validate: {
        max: {
          args: [10.0],
          msg: "A média deve ser no máximo 10.0."
        },
        isFloat: {
          msg: "A média deve ser um número decimal."
        }
      }
    },
    turma_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'turmas',
        key: 'id',
      }
    }
  });

  return Alunos;
};
