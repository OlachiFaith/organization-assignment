const { Sequelize, DataTypes, Model } = require('sequelize');
const Organization = require('./organization');
const sequelize = require('../database/database')

class Equipment extends Model { }

Equipment.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Organizations',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiryDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Equipment', // We need to choose the model name
    tableName: 'Equipments',
    timestamps: true
  },
);


Equipment.belongsTo(Organization, {
  foreignKey: 'organizationId',
  as: 'Organization'
});

Organization.hasMany(Equipment, {
  foreignKey: 'organizationId',
  as: 'Equipments'
});


module.exports = Equipment