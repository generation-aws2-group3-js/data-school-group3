export default (sequelize, Sequelize) => {
    const Turmas = sequelize.define("turmas", {
      // parâmetros aqui

    //   exemplo
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Turmas;
  };
  