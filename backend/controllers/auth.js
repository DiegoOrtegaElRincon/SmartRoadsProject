const jwt = require('jsonwebtoken');
const utils = require('../utils');
const bcrypt = require('bcryptjs');

const db = require("../models/db");
const Admin = db.Admin;

exports.signin = (req, res) => {

  const username = req.body.Username;
  const password = req.body.Password;

  if (!username || !password) {
    return res.status(400).json({
      error: true,
      message: "Username and Password are required."
    });
  }

  // return 401 status if the credential is not match.
  Admin.findOne({ where: { Username: username } })
    .then(data => {
      const result = bcrypt.compareSync(password, data.Password);
      if (!result) return res.status(401).send('Password not valid!');

      // generate token
      const token = utils.generateToken(data);
      // get basic user details
      const userObj = utils.getCleanUser(data);
      // return the token along with user details
      return res.json({ user: userObj, access_token: token });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Admin."
      });
    });
};

exports.isAuthenticated = (req, res, next) => {
  // check header or url parameters or post parameters for token
  // var token = req.body.token || req.query.token;
  var token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, admin) {
    console.log(admin)
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    Admin.findOne({where: {Username: admin.Username}}).then(data => {
      console.log('-------------------------------------------------------------')
      console.log(data)
      // return 401 status if the userId does not match.
      if (!data?.Id) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      }

      req.admin = { Id: admin.Id };
      // get basic user details
      next();
    })
      .catch(err => {
        console.error("Error during authentication:", err);
        res.status(500).send({
          message: "Error retrieving Admin"
        });
      });
  });
};