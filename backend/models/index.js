// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');
const ArchivoModel = require('./Archivo');

const sequelize = new Sequelize(config.development);

const models = {
  Archivo: ArchivoModel(sequelize, DataTypes),
  // Otros modelos aquí
};

// Relaciones entre modelos si es necesario
// ...

module.exports = { sequelize, models };
