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
    // Puedes agregar más campos según tus necesidades
  });

  // Definir la relación con ActiveElement, ChangingElement, y PassiveElement
  // Spot.belongsTo(sequelize.models.ActiveElement, { foreignKey: 'UID' });
  // Spot.belongsTo(sequelize.models.ChangingElement, { foreignKey: 'UID' });
  // Spot.belongsTo(sequelize.models.PassiveElement, { foreignKey: 'UID' });

  return Spot;
};
