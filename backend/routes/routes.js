// routes/archivo.js
const express = require('express');
const router = express.Router();
const { models } = require('../models');

router.get('/', async (req, res) => {
  try {
    const archivos = await models.Archivo.findAll();
    res.json(archivos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener archivos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevoArchivo = await models.Archivo.create({ nombre });
    res.json(nuevoArchivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear archivo' });
  }
});

// Otros endpoints CRUD
// ...

module.exports = router;
