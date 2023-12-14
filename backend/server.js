require("dotenv").config();

const express = require('express');

const cors = require('cors');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const path = require('path');

const bodyParser = require('body-parser');

const db = require('./models/db');



const upload = require("./multer/upload");

const sequelize = db.sequelize;
const app = express();
const PORT = process.env.APP_PORT;

const corsOptions = {
    origin: "*"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
// app.use(function (req, res, next) {
//     // check header or url parameters or post parameters for token
//     var token = req.headers['authorization'];
//     if (!token) return next(); //if no token, continue

//     if (req.headers.authorization.indexOf('Basic ') === 0) {
//         // verify auth basic credentials
//         const base64Credentials = req.headers.authorization.split(' ')[1];
//         const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
//         const [username, password] = credentials.split(':');

//         req.body.username = username;
//         req.body.password = password;

//         return next();
//     }

//     token = token.replace('Bearer ', '');
//     // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
//     jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//         if (err) {
//             return res.status(401).json({
//                 error: true,
//                 message: "Invalid user."
//             });
//         } else {
//             req.user = user; //set the user to req so other routes can use it
//             req.token = token;
//             next();
//         }
//     });
// });

app.use(function (req, res, next) {
    var token = req.headers['authorization'];

    if (token && token.indexOf('Basic ') === 0) {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');


        req.body.Username = username;
        req.body.Password = password;
        req.bodyb = {};
        req.bodyb.Username = username;
        req.bodyb.Password = password;

        return next();
    }

    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
            if (err) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid user."
                });
            } else {
                req.user = user;
                req.token = token;
                next();
            }
        });
    } else {
        next();
    }
});

sequelize.authenticate().then(async () => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.listen(PORT, () => {
    console.log(`server is listening  on ${PORT}`);
});

require('./routes/activeElementRoutes')(app)
require('./routes/changingElementRoutes')(app)
require('./routes/passiveElementRoutes')(app)
require('./routes/spotsRoutes')(app)
require('./routes/adminRoutes')(app)

module.exports = app;
