module.exports = (app) => {
const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spot.controller');

// Rutas para Spots
router.post('/', spotController.create);
router.get('/', spotController.findAll);
router.get('/:id', spotController.findOne);
router.put('/:id', spotController.update);
router.delete('/:id', spotController.delete);


app.use('/spots', router);

}
