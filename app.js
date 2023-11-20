// app.js
const express = require('express');
const { Sequelize } = require('sequelize');
const config = require('./config');
const multer = require('multer');
const bodyParser = require('body-parser');
const archivoRouter = require('./routes/archivo');

const app = express();
const sequelize = new Sequelize(config.development);

// Verifica la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Configuración de Express
app.use(bodyParser.json());
app.use('/archivos', archivoRouter);

// Resto de la configuración de Express
// ...

// Escuchar en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
