const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database')
const Orders = require('./orders')

class deliveryTables extends Model { }

deliveryTables.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    processedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clothes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'deliveryTables', // We need to choose the model name
    tableName: 'deliveryTables',
    timestamps: true
  },
);


deliveryTables.belongsTo(Orders, {
  foreignKey: 'orderId',
  as: 'Orders'
});

Orders.hasMany(deliveryTables, {
  foreignKey: 'orderId',
  as: 'Delivery'
});


module.exports = deliveryTables