// models/Spot.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Spot = sequelize.define('Spot', {
    UID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    // Puedes agregar más campos según tus necesidades
  });

  // Definir la relación con ActiveElement, ChangingElement, y PassiveElement
  // Spot.belongsTo(sequelize.models.ActiveElement, { foreignKey: 'UID' });
  // Spot.belongsTo(sequelize.models.ChangingElement, { foreignKey: 'UID' });
  // Spot.belongsTo(sequelize.models.PassiveElement, { foreignKey: 'UID' });

  return Spot;
};
