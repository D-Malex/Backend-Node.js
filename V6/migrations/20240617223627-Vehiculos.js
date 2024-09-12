'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Vehiculos',{
      id_vehiculo: {type: Sequelize.INTEGER,allowNull: false,primaryKey: true,},  
      patente:            Sequelize.STRING,  
      carga_util:         Sequelize.REAL,
      licencia_minima:    Sequelize.STRING,
      en_uso:             Sequelize.INTEGER,
    },
    {sync: {force:true}});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Vehiculos');
  }
};
