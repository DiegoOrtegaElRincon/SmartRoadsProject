const db = require('../models/db');

const Spot = db.Spot;
const ActiveElement = db.ActiveElement;
const ChangingElement = db.ChangingElement;
const PassiveElement = db.PassiveElement;


module.exports = {
    getAllActiveElementsSpots,
    getOneActiveElementSpot
};


async function getOneActiveElementSpot(id) {

    const activeElement = await ActiveElement.findByPk(id, { include: [Spot] });
    return activeElement;
}




async function getAllActiveElementsSpots() {

    const activeElements = await ActiveElement.findAll({ include: [Spot] });
    return activeElements;
}