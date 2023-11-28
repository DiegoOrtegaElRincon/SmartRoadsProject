module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const passiveElementController = require('../controllers/passiveElement.controller');

    // Rutas para PassiveElements
    router.post('/', passiveElementController.create);
    router.get('/', passiveElementController.findAll);
    router.get('/:id', passiveElementController.findOne);
    router.put('/:id', passiveElementController.update);
    router.delete('/:id', passiveElementController.delete);


    app.use('/passiveelements', router);

}
