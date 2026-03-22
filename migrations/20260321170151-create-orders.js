'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
        id: {
              allowNull: false,
              primaryKey: true,
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4,
            },
            OrganizationId: {
              allowNull: false,
              type: Sequelize.UUID,
              references: {
                model: "Organizations",
                key: "id",
              },
              onDelete: "CASCADE",
              onUpdate: "CASCADE",
             },
            type: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            status: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            staff: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            amount: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            images: {
        type: Sequelize.JSON,
        allowNull: false
      },
      imagePublicIds: {
        type: Sequelize.JSON,
        allowNull: false
      },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};