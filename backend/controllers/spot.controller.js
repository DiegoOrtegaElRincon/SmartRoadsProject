const db = require("../models/db");
const Spot = db.spot;
const Op = db.Sequelize.Op;

// Create and Save a new Spot
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body.location) {
            res.status(400).send({
                message: "Location cannot be empty!"
            });
            return;
        }

        // Create a Spot
        const spot = {
            location: req.body.location,
        };

        // Save Spot in the database
        const data = await Spot.create(spot);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the spot."
        });
    }
};

// Retrieve all Spots from the database.
exports.findAll = async (req, res) => {
    try {
        const data = await Spot.findAll();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Spots."
        });
    }
};

// Find a single Spot with an id
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Spot.findByPk(id);
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find spot with id=${id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving spot with id=" + id
        });
    }
};

// Update a Spot by the id in the request
exports.update = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate request
        if (!req.body.location) {
            res.status(400).send({
                message: "Location cannot be empty!"
            });
            return;
        }

        // Create a Spot
        const spot = {
            location: req.body.location,
        };

        const num = await Spot.update(spot, {
            where: { UID: id }
        });

        if (num == 1) {
            res.send({
                message: "Spot was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Spot with id=${id}. Maybe Spot was not found or req.body is empty!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Spot with id=" + id
        });
    }
};

// Delete a Spot with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const num = await Spot.destroy({
            where: { UID: id }
        });

        if (num == 1) {
            res.send({
                message: "Spot was deleted successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot delete Spot with id=${id}. Maybe Spot was not found!`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Spot with id=" + id
        });
    }
};

exports.deleteAll = (req, res) => {
    Spot.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Spot were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Spot."
            });
        });
};