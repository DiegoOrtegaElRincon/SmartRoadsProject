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
    Location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    // Otros campos según tus necesidades
  });

  return ChangingElement;
};
