module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const adminController = require('../controllers/admin.controller')
    const upload = require('../multer/upload');

    // Rutas para ActiveElements
    router.get('/', adminController.findAll);
    router.post('/', upload.single('file'), adminController.create);
    router.get('/:id', adminController.findOne);
    router.put('/noimage/:id', adminController.updateNoImage);
    router.put('/:id', upload.single('file'), adminController.update);
    router.delete('/:id', adminController.delete);

    app.use('/admins', router);
}
