export default (sequelize, Sequelize) => {
    const Funcionarios = sequelize.define("funcionarios", {
      // parâmetros aqui
      
      //   exemplo
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return Funcionarios;
  };
  