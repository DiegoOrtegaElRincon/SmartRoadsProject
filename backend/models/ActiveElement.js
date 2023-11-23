// models/ActiveElement.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ActiveElement = sequelize.define('ActiveElement', {
    UID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Pending'),
      allowNull: false,
    },
    Speed: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // Valor por defecto a la fecha y hora actual
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Valor por defecto a la fecha y hora actual y se actualiza en cada modificación
    },
    // Otros campos según tus necesidades
  });

  // Definir la relación con Spot
  // ActiveElement.hasMany(sequelize.models.Spot);

  return ActiveElement;
};
