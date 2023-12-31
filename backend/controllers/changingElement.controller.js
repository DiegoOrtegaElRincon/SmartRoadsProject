const db = require("../models/db");
const ChangingElement = db.ChangingElement;
const Op = db.Sequelize.Op;

// Create and Save a new ChangingElement
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.status || !req.body.location || !req.body.location.coordinates) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  try {
    // Create a ChangingElement
    const changingElement = {
      Type: req.body.type,
      Status: req.body.status,
      Location: {
        type: 'Point',
        coordinates: [req.body.location.coordinates[0], req.body.location.coordinates[1]]
      }
    };

    // Save ChangingElement in the database
    ChangingElement.create(changingElement).then(data => {
      res.send(data);
    }).catch(err => {
      console.error(err);  // Log the error for debugging purposes
      res.status(500).send({
        message: err.message || "Some error occurred while creating the changingElement"
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message || "An unexpected error occurred"
    });
  }
};


// Retrieve all ChangingElement from the database.
exports.findAll = (req, res) => {
  ChangingElement.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all ChangingElements"
    })
  })
};

// Find a single ChangingElement with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ChangingElement.findByPk(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find changingElement with id=${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving changingElement with id=" + id
    });
  });
}

// Update a ChangingElement by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.type || !req.body.status || !req.body.location.coordinates) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }
  // Create a ChangingElement

  console.log(req.body)
  const changingElement = {
    Type: req.body.type,
    Status: req.body.status,
    Location: {
      type: 'Point',
      coordinates: [req.body.location.coordinates[0], req.body.location.coordinates[1]]
    }
  };

  console.log(changingElement)

  ChangingElement.update(changingElement, {
    where: { UID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ChangingElement was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ChangingElement with id=${id}. Maybe ChangingElement was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ChangingElement with id=" + id
      });
    });
};

// Delete a ChangingElement with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const changingElement = await ChangingElement.findByPk(id);

    const num = await ChangingElement.destroy({
      where: { UID: id }
    });

    if (num == 1) {
      res.send({
        message: "ChangingElement was deleted successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot delete ChangingElement with id=${id}. Maybe ChangingElement was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete ChangingElement with id=" + req.params.id
    });
  }
};

exports.deleteAll = (req, res) => {
  ChangingElement.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} ChangingElement were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ChangingElement."
      });
    });
};