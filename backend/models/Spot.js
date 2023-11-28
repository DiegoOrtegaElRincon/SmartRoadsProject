// models/Spot.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Spot = sequelize.define('Spot', {
    UID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    // Puedes agregar más campos según tus necesidades
  });

  return Spot;
};
