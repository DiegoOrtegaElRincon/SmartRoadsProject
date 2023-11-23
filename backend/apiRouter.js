//apiRouter.js

const express = require('express');
const apiRouter = express.Router();
const { getAllActiveElementsSpots, getOneActiveElementSpot } = require('./controllers/controller');

// Get all companies with employees

apiRouter.get('/', async (req, res, next) => {
    try {
        const activeElements = await getAllActiveElementsSpots();
        res.status(200).json({ activeElements: activeElements });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

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




// Get company with its employees

apiRouter.get('/:UID', (req, res, next) => {
    res.status(200).json({ company: req.company });
});



module.exports = apiRouter;