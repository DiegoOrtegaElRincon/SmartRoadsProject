const config = require('../config.js');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const { host, port, user, password, database } = config.database;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`).then(() => {
    console.log('Database created or already exists');
}).catch((err) => {
    console.error('Error creating database:', err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Spot = require('./Spot.js')(sequelize, Sequelize);
db.ActiveElement = require('./ActiveElement.js')(sequelize, Sequelize);
db.ChangingElement = require('./ChangingElement.js')(sequelize, Sequelize);
db.PassiveElement = require('./PassiveElement.js')(sequelize, Sequelize);
db.Admin = require('./Admin.js')(sequelize, Sequelize);

// Sincronizar todos los modelos con la base de datos
sequelize.sync({ force: true }).then(async () => {
    // Definir relaciones entre modelos después de sincronizar
    db.Spot.belongsTo(db.ActiveElement, { foreignKey: 'UID' }, { onDelete: 'cascade' }, { onUpdate: 'cascade' });
    db.ActiveElement.hasMany(db.Spot, { foreignKey: 'UID' }, { onDelete: 'cascade' }, { onUpdate: 'cascade' });

    console.log('Database and models synchronized successfully.');

    const checkAdmin = await db.Admin.findOne({ where: { Username: 'test' } });

    if (!checkAdmin) {
        const cryptedPwd = await bcrypt.hash('1234', 10);

        const testAdmin = await db.Admin.create({
            Id: 1,
            Username: 'test',
            Password: cryptedPwd,
            filename: 'placeholder-image.jpg'
        });

        console.log('Admin predeterminado creado con éxito.');
    }

}).catch((err) => {
    console.error('Error synchronizing database and models:', err);
});

// Exportar modelos y sequelize
module.exports = db;
