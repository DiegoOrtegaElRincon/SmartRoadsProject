const db = require("../models/db");
const PassiveElement = db.PassiveElement;
const Op = db.Sequelize.Op;

// Create and Save a new PassiveElement
exports.create = async (req, res) => {
  try {
    // Validate request
    // if (!req.body.type) {
    //   res.status(400).send({
    //     message: "Content cannot be empty!"
    //   });
    //   return;
    // }
    
    // Create a PassiveElement
    const passiveElement = {
      Type: req.body.type
    };
    
    // Save PassiveElement in the database
    const data = await PassiveElement.create(passiveElement);
    res.send(data);
  } catch (err) {
    console.log(err)
    res.status(500).send({
      message: err.message || "Some error occurred while creating the passiveElement"
    });
  }
};

// Retrieve all PassiveElement from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await PassiveElement.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all PassiveElements"
    });
  }
};

// Find a single PassiveElement with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await PassiveElement.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find passiveElement with id=${id}.`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving passiveElement with id=" + req.params.id
    });
  }
};

// Update a PassiveElement by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate request
    if (!req.body.type) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
      return;
    }

    // Create a PassiveElement
    const passiveElement = {
      Type: req.body.type
    };
    
    const num = await PassiveElement.update(passiveElement, {
      where: { UID: id }
    });

    if (num == 1) {
      res.send({
        message: "PassiveElement was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update PassiveElement with id=${id}. Maybe PassiveElement was not found or req.body is empty!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating PassiveElement with id=" + req.params.id
    });
  }
};

// Delete a PassiveElement with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const passiveElement = await PassiveElement.findByPk(id);

    const num = await PassiveElement.destroy({
      where: { UID: id }
    });

    if (num == 1) {
      res.send({
        message: "PassiveElement was deleted successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot delete PassiveElement with id=${id}. Maybe PassiveElement was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete PassiveElement with id=" + req.params.id
    });
  }
};
