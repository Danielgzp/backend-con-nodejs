const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

//importo los modelos
const setupModels = require('../db/models/')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  //para que no de un warning
  logging: console.log,
});

setupModels(sequelize);
// lee los modelos y crea las tables
//En este curso lo ejamos de utilizar ya que no es recomdable hacer sync en modo produccion 
//por lo cual hacemos migraciones

/* sequelize.sync(); */

module.exports = sequelize;
