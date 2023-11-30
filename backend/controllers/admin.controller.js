const db = require("../models/db");
const Admin = db.Admin;
const Op = db.Sequelize.Op;
const path = require('path');
const fs = require("fs");
const { where } = require("sequelize");
const { request } = require("http");

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a Admin
    const admin = {
        Id: req.body.id,
        Username: req.body.username,
        Password: req.body.password,
        filename: req.file ? req.file.filename : ""
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
exports.update = async (req, res) => {

    const admin = {
        Id: req.body.id,
        Username: req.body.username,
        Password: req.body.password
    }

    const id = req.params.id;
    const IsThere = await Admin.findByPk(id);

    if (!IsThere) {
        return res.status(404).send({
            message: `Cannot update Admin with id=${id}`
        });
    }

    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    try {
        console.log("PRE PRE UPDATE", IsThere)

        if (IsThere.filename && IsThere.filename != "") {
            const directoryPath = path.join(__dirname, '../public/images', IsThere.filename);
            fs.unlinkSync(directoryPath);
        }

        if (req.file) {
            const img = req.file.filename
            admin.filename = img
        }

        console.log("Pre UPDATE", IsThere)

        await IsThere.update(admin, {
            where: { Id: id }
        });

        console.log("POST UPDATE", IsThere)
        res.send({
            message: "Admin was updated successfully."
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            message: "Error updating Admin with id=" + id
        });
    }
};

exports.updateNoImage = async (req, res) => {
    const id = req.params.id
    let uwu = await Admin.findByPk(id)
    let admin = {
        Username: req.body.username,
        Password: req.body.password,
        filename: ""
    };

    console.log(admin)
    Admin.update(admin, {
        where: { Id: id }
    }).then(async num => {
        if (num == 1) {
            console.log(uwu.get({ plain: true }))
            uwu = uwu.get({ plain: true })
            const directoryPath = path.join(__dirname, '../public/images', uwu.filename);
            if (fs.existsSync(directoryPath)) {
                fs.unlink(directoryPath, (err) => {
                    if (err) {
                        console.error("Error deleting image file: ", err);
                    } else {
                        console.log("Image file deleted: ", directoryPath);
                    }
                });
                console.log("Image file deleted: ", directoryPath)
            } else {
                console.error('File does not exist: ', directoryPath);
            }
        }
    })
};


// Delete a Admin with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        const AdminExists = await Admin.findByPk(id);

        if (!AdminExists) {
            return res.status(404).send({
                message: `Cannot delete. Admin with id=${id} not found.`
            });
        }

        try {
            if (AdminExists.filename) {
                const directoryPath = path.join(__dirname, '../public/images', AdminExists.filename);
                if (fs.existsSync(directoryPath)) {
                    fs.unlink(directoryPath, (err) => {
                        if (err) {
                            console.error("Error deleting image file: ", err);
                        } else {
                            console.log("Image file deleted: ", directoryPath);
                        }
                    });
                    console.log("Image file deleted: ", directoryPath)
                } else {
                    console.error('File does not exist: ', directoryPath);
                }
            }
        } catch (err) {
            console.error("Error delete image file: ", err)
        }

        await Admin.destroy({ where: { Id: id } });
        res.status(200).send("Admin has been deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error deleting the Admin"
        })
    }
}
