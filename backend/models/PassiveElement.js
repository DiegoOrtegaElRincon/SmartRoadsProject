// models/PassiveElement.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PassiveElement = sequelize.define('PassiveElement', {
    UID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    // Otros campos según tus necesidades
  });

  return PassiveElement;
};