'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Habilitaciones',
      [
        {id_chofer:1,id_vehiculo:2,},
        {id_chofer:1,id_vehiculo:4,},
        {id_chofer:1,id_vehiculo:12,},
        {id_chofer:3,id_vehiculo:6,},
        {id_chofer:9,id_vehiculo:2,}
      ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Habilitaciones', null, {});
  }
};
