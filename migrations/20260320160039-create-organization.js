'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organizations', {
    id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          address: {
            type: Sequelize.STRING,
            allowNull: false
          },
          logo: {
            type: Sequelize.STRING,
            allowNull: false
          },
          logoIds: {
            type: Sequelize.STRING,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false
          },
          phoneNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Organizations');
  }
};