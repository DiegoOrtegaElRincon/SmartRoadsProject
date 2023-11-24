const db = require("../models/db");
const ActiveElement = db.ActiveElement;
const Op = db.Sequelize.Op;

// Create and Save a new ActiveElement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.status || !req.body.speed) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  // Create a ActiveElement
  const activeElement = {
    Type: req.body.type,
    Status: req.body.status,
    Speed: req.body.speed
  }
  // Save ActiveElement in the database
  ActiveElement.create(activeElement).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the activeElement"
    })
  });
};

// Retrieve all ActiveElement from the database.
exports.findAll = (req, res) => {
  ActiveElement.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all ActiveElements"
    })
  })
};

// Find a single ActiveElement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ActiveElement.findByPk(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find activeElement with id=${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving activeElement with id=" + id
    });
  });
}

// Update a ActiveElement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.type || !req.body.status || !req.body.speed) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  // Create a ActiveElement
  const activeElement = {
    Type: req.body.type,
    Status: req.body.status,
    Speed: req.body.speed
  }

  ActiveElement.update(activeElement, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "ActiveElement was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update ActiveElement with id=${id}. Maybe ActiveElement was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating ActiveElement with id=" + id
    });
  });
};

// Delete a ActiveElement with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  ActiveElement.findByPk(id)
    .then(activeElement => {
      if (!activeElement) {
        return res.status(404).send({
          message: `Cannot delete. ActiveElement with id=${id} not found.`
        });
      }

      return ActiveElement.destroy({
        where: { id: id }
      });
    })
    .then(() => {
      res.send({
        message: "ActiveElement was deleted successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ActiveElement with id=" + id
      });
    });
};