// models/ChangingElement.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChangingElement = sequelize.define('ChangingElement', {
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
  // ChangingElement.hasMany(sequelize.models.Spot);

  return ChangingElement;
};
