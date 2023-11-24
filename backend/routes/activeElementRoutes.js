module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const activeElementController = require('../controllers/activeElement.controller')

    // Rutas para ActiveElements
    router.get('/', activeElementController.findAll);
    router.post('/', activeElementController.create);
    router.get('/:id', activeElementController.findOne);
    router.put('/:id', activeElementController.update);
    router.delete('/:id', activeElementController.delete);

    app.use('/activeelements', router);
}
