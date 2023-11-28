require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const db = require('./models/db');

const sequelize = db.sequelize;

const app = express();

const PORT = process.env.APP_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


sequelize.authenticate().then(() => {
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