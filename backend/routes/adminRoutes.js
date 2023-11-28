module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const adminController = require('../controllers/admin.controller')

    // Rutas para ActiveElements
    router.get('/', adminController.findAll);
    router.post('/', adminController.create);
    router.get('/:id', adminController.findOne);
    router.put('/:id', adminController.update);
    router.delete('/:id', adminController.delete);

    app.use('/admins', router);
}
