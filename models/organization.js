const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database')

class Organization extends Model {}

Organization.init(
  {
    // Model attributes are defined here
   id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4
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
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Organisation', // We need to choose the model name
  },
);

module.exports = Organization