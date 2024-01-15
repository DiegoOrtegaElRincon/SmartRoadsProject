module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const auth = require("../controllers/auth.js");
    const activeElementController = require('../controllers/activeElement.controller')

    // Rutas para ActiveElements
    router.get('/', auth.isAuthenticated, activeElementController.findAll);
    router.get('/jsreport', activeElementController.findAll);
    router.post('/', auth.isAuthenticated, activeElementController.create);
    router.get('/:id', auth.isAuthenticated, activeElementController.findOne);
    router.put('/:id', auth.isAuthenticated, activeElementController.update);
    router.delete('/:id', auth.isAuthenticated, activeElementController.delete);
    router.delete('/', auth.isAuthenticated, activeElementController.deleteAll)

    app.use('/activeelements', router);
}
