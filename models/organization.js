const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = require('../database/database');

class Organization extends Model {}

  Organization.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      Logo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      LogoPublicId: {
        type: DataTypes.STRING,
        allowNull: false

      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false

      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  
module.exports = Organization