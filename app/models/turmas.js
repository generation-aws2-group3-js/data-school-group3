export default (sequelize, Sequelize) => {
  const Turmas = sequelize.define("turmas", {
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
          msg: "O nome da turma é obrigatório."
        },
        len: {
          args: [3, 150],
          msg: "O nome da turma deve ter pelo menos 3 caracteres. E no máximo 150 caracteres."
        }
      }
    },
    instrutor: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O nome do instrutor é obrigatório."
        },
        notEmpty: {
          msg: "O nome do instrutor não pode ser uma string vazia."
        },
        len: {
          args: [3, 150],
          msg: "O nome do instrutor deve ter pelo menos 3 caracteres. E no máximo 150 caracteres."
        }
      }
    }
  });

  Turmas.hasMany(sequelize.models.alunos, {
    foreignKey: 'turma_id',
    as: 'alunos'
  });

  return Turmas;
};
