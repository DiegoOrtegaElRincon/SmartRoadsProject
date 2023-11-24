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
    // Otros campos según tus necesidades
  });

  // Definir la relación con Spot
  // ActiveElement.hasMany(sequelize.models.Spot);

  return ActiveElement;
};
