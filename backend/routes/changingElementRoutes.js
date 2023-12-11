module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const changingElementController = require('../controllers/changingElement.controller');

    // Rutas para ChangingElements
    router.post('/', changingElementController.create);
    router.get('/', changingElementController.findAll);
    router.get('/:id', changingElementController.findOne);
    router.put('/:id', changingElementController.update);
    router.delete('/:id', changingElementController.delete);
    router.delete('/', changingElementController.deleteAll)


    app.use('/changingelements', router);
}
