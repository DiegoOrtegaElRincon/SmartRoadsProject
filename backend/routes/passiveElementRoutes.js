module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const auth = require("../controllers/auth.js");
    const passiveElementController = require('../controllers/passiveElement.controller');

    // Rutas para PassiveElements
    router.post('/', auth.isAuthenticated, passiveElementController.create);
    router.get('/', auth.isAuthenticated, passiveElementController.findAll);
    router.get('/:id', auth.isAuthenticated, passiveElementController.findOne);
    router.put('/:id', auth.isAuthenticated, passiveElementController.update);
    router.delete('/:id', auth.isAuthenticated, passiveElementController.delete);
    router.delete('/', auth.isAuthenticated, passiveElementController.deleteAll)


    app.use('/passiveelements', router);

}
