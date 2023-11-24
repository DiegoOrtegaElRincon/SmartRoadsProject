//apiRouter.js

const express = require('express');
const apiRouter = express.Router();
const { getAllActiveElementsSpots, getOneActiveElementSpot } = require('./controllers/controller');

// Obtener todos los elementos activos con spots
apiRouter.get('/', async (req, res) => {
    try {
        const activeElements = await getAllActiveElementsSpots();
        res.status(200).json({ activeElements: activeElements });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Middleware para manejar el parámetro UID
apiRouter.param('UID', async (req, res, next, UID) => {
    try {
        const activeElement = await getOneActiveElementSpot(UID);
        req.activeElement = activeElement;
        next();
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});

// Obtener un elemento activo por su UID
apiRouter.get('/:UID', (req, res) => {
    res.status(200).json({ activeElement: req.activeElement });
});

module.exports = apiRouter;
