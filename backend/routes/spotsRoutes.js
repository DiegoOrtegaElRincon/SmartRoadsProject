module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const auth = require("../controllers/auth.js");
    const spotController = require('../controllers/spot.controller');

    // Rutas para Spots
    router.post('/', auth.isAuthenticated, spotController.create);
    router.get('/', auth.isAuthenticated, spotController.findAll);
    router.get('/:id', auth.isAuthenticated, spotController.findOne);
    router.put('/:id', auth.isAuthenticated, spotController.update);
    router.delete('/:id', auth.isAuthenticated, spotController.delete);
    router.delete('/', auth.isAuthenticated, spotController.deleteAll)


    app.use('/spots', router);

}
