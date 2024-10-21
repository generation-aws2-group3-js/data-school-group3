export default (sequelize, Sequelize) => {
    const Alunos = sequelize.define("alunos", {
      // parâmetros aqui

      //   exemplo
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Alunos;
  };
  