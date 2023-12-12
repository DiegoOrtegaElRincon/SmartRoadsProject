module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const auth = require("../controllers/auth.js");
    const adminController = require('../controllers/admin.controller')
    const upload = require('../multer/upload');

    // Rutas para ActiveElements
    router.get('/', auth.isAuthenticated, adminController.findAll);
    router.post('/', upload.single('file'), adminController.create);
    router.get('/:id', auth.isAuthenticated, adminController.findOne);
    router.put('/noimage/:id', auth.isAuthenticated, adminController.updateNoImage);
    router.put('/:id', auth.isAuthenticated, upload.single('file'), adminController.update);
    router.delete('/:id', auth.isAuthenticated, adminController.delete);
    router.delete('/', auth.isAuthenticated, adminController.deleteAll)

    router.post("/signin", auth.signin);

    app.use('/admins', router);
}
