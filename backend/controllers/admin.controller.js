const db = require("../models/db");
const Admin = db.Admin;
const Op = db.Sequelize.Op;

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id || !req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a Admin
    const Admin = {
        ID: req.body.id,
        Username: req.body.username,
        Password: req.body.password
    }
    // Save Admin in the database
    Admin.create(admin).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin"
        })
    });
};

// Retrieve all Admin from the database.
exports.findAll = (req, res) => {
    Admin.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Admins"
        })
    })
};

// Find a single Admin with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Admin.findByPk(id).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find admin with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving admin with id=" + id
        });
    });
}

// Update a Admin by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    
    if (!req.body.id || !req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a Admin
    const Admin = {
        ID: req.body.id,
        Username: req.body.username,
        Password: req.body.password
    }

    console.log(admin)
    Admin.update(admin, {
        where: { UID: id }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: "Admin was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Admin with id=${id}. Maybe Admin was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: "Error updating Admin with id=" + id
        });
    });
};

// Delete a Admin with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Admin.findByPk(id)
        .then(admin => {
            if (!admin) {
                return res.status(404).send({
                    message: `Cannot delete. Admin with id=${id} not found.`
                });
            }

            return Admin.destroy({
                where: { UID: id }
            });
        })
        .then(() => {
            res.send({
                message: "Admin was deleted successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Admin with id=" + id
            });
        });
};