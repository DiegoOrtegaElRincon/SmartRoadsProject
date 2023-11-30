require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');

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