module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const auth = require("../controllers/auth.js");
    const changingElementController = require('../controllers/changingElement.controller');

    // Rutas para ChangingElements
    router.post('/', auth.isAuthenticated, changingElementController.create);
    router.get('/', auth.isAuthenticated, changingElementController.findAll);
    router.get('/:id', auth.isAuthenticated, changingElementController.findOne);
    router.put('/:id', auth.isAuthenticated, changingElementController.update);
    router.delete('/:id', auth.isAuthenticated, changingElementController.delete);
    router.delete('/', auth.isAuthenticated, changingElementController.deleteAll)


    app.use('/changingelements', router);
}
