const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/database");
const Organization = require("./organization");

class Orders extends Model {}

Orders.init(
  {
    // Model attributes are defined here
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    Organizationid: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "Organizations",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
     },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: [{
        type: DataTypes.STRING,
        allowNull: false,
        get () {
          const value = this.getDataValue('images');
          // Parse the stored JSON string back into an array
          return value ? JSON.parse(value) : [];
        },
        set(val) {
          // Stringify the value into a JSON string before saving
          this.setDataValue('images', JSON.stringify(val));
        }
      }],
      imagePublicIds: [{
        type: DataTypes.STRING,
        allowNull: false,
        get () {
          const value = this.getDataValue('imagePublicIds');
          // Parse the stored JSON string back into an array
          return value ? JSON.parse(value) : [];
        },
        set(val) {
          // Stringify the value into a JSON string before saving
          this.setDataValue('imagePublicIds', JSON.stringify(val));
        }
      }],
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Orders", // We need to choose the model name
  },
);

Organization.hasMany(Orders, {
  foreignKey: 'Organizationid',
  as: 'orders'
})

Orders.belongsTo(Organization,{
  foreignKey: 'Organizationid',
  as: 'organization'
})

module.exports = Orders;
