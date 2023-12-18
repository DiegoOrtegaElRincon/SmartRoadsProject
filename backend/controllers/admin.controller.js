const db = require("../models/db");
const Admin = db.Admin;
const Op = db.Sequelize.Op;
const utils = require("../utils");
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require("fs");

// Create and Save a new Admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Admin
    const admin = {
        Username: req.body.username,
        Password: req.body.password,
        filename: req.file ? req.file.filename : "placeholder-img.jpg",
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false
    }

    Admin.findOne({ where: { Username: admin.Username } }).then(data => {
        if (data) {
            const result = bcrypt.compareSync(admin.Password, data.password);
            if (!result) return res.status(401).send('Password not valid!');
            const token = utils.generateToken(data);
            // get basic admin details
            const userObj = utils.getCleanUser(data);
            // return the token along with admin details
            return res.json({ admin: userObj, access_token: token });
        }

        admin.Password = bcrypt.hashSync(req.body.password);

        // Save Admin in the database
        Admin.create(admin)
            .then(data => {
                const token = utils.generateToken(data);
                // get basic admin details
                const userObj = utils.getCleanUser(data);
                // return the token along with admin details
                return res.json({ admin: userObj, access_token: token });
            }).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the User."
                });
            });

    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving admins."
        });
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

    Admin.findByPk(id, { attributes: { exclude: ['Password'] } }).then(data => {
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


    if (req.body.Password) {
        admin.Password = bcrypt.hashSync(req.body.password);
    }

    try {

        if (IsThere.filename && IsThere.filename != "" && (IsThere.filename != 'placeholder-image.jpg')) {
            const directoryPath = path.join(__dirname, '../public/images', IsThere.filename);
            fs.unlinkSync(directoryPath);
        }

        if (req.file) {
            const img = req.file.filename
            admin.filename = img
        }

        await IsThere.update(admin, {
            where: { Id: id }
        });
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

    const Pwd = req.body.Password;
    const cryptedPwd = await bcrypt.hash(Pwd, 10);
    let admin = {
        Username: req.body.Username,
        Password: cryptedPwd,
        filename: ""
    };

    try {
        const num = await Admin.update(admin, {
            where: { Id: id }
        });

        if (num == 1) {
            uwu = uwu.get({ plain: true })
            const directoryPath = path.join(__dirname, '../public/images', uwu.filename);
            if (fs.existsSync(directoryPath)) {
                if (uwu.filename != '' && (uwu.filename != 'placeholder-image.jpg')) {
                    fs.unlink(directoryPath, (err) => {
                        if (err) {
                            console.error("Error deleting image file: ", err);
                        } else {
                            console.log("Image file deleted: ", directoryPath);
                        }
                    })
                };
            } else {
                console.error('File does not exist: ', directoryPath);
            }
            res.send({
                message: "Admin was updated successfully."
            });
        } else {
            throw new Error("Failed to update Admin");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Error updating Admin with id=" + id
        });
    }
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
            if (AdminExists.filename && (AdminExists.filename != 'placeholder-image.jpg')) {
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


exports.deleteAll = (req, res) => {

    Admin.findAll()
        .then(admins => {
            const imageFileNames = [];

            admins.forEach(admin => {
                if (admin.filename && (admin.filename != 'placeholder-image.jpg')) {
                    imageFileNames.push(admin.filename);
                }
            });

            imageFileNames.forEach(fileName => {
                const imagePath = path.join(__dirname, '../public/images/', fileName);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                    }
                });
            });

            const admin1 = Admin.findOne({
                order: [ [ 'Id', 'ASC' ]],
            })

            Admin.destroy({
                where: { [Op.ne]: admin1.Id },
                truncate: false
            })
                .then(nums => {
                    res.send({ message: `${nums} Admins were deleted successfully!` });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while removing all Admins."
                    });
                });
        })
};


exports.findUserByUsernameAndPassword = (req, res) => {
    const user = req.body.username;
    const pwd = req.body.password;

    Admin.findOne({ where: { Username: user, Password: pwd } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving admins."
            });
        });
};