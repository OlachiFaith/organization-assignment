'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class deliveryTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      deliveryTable.belongsTo(models.Order, {
        foreignKey:'orderId',
      })
    }
  }
  deliveryTable.init({
    processedBy: DataTypes.STRING,
    status: DataTypes.STRING,
    clothes: DataTypes.STRING,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'deliveryTable',
  });
  return deliveryTable;
};