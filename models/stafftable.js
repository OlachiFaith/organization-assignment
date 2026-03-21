const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/database");
const Organization = require("./organization");

class Stafftable extends Model {}

Stafftable.init(
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
        model: "Organization",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
     },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staffDp: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    profilePhotos: {
      type: DataTypes.JSON,
      allowNull: false,
    },
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
    modelName: "Stafftable", // We need to choose the model name
    tableName: "Stafftables",
  },
);

Organization.hasMany(Stafftable, {
  foreignKey: 'organizationId',
  as: 'staffs'
})

Stafftable.belongsTo(Organization,{
  foreignKey: 'organizationId',
  as: 'organization'
})

module.exports = Stafftable;
