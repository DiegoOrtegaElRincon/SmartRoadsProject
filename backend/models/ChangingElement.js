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
    // Otros campos según tus necesidades
  });

  // Definir la relación con Spot
  // ChangingElement.hasMany(sequelize.models.Spot);

  return ChangingElement;
};
