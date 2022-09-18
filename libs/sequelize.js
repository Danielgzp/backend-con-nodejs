const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
//importo los modelos
const setupModels = require('../db/models/')

const options = {
  dialect: 'postgres',
  // logging: config.isProd ? false : true,

  //para que no de un warning
  logging: console.log,
};

if (config.isProduction) {

  //Recordar este tipo de configraicoens es para deploys con Heroku
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

//aqui no es necesario configurar la url de la db porque ya nos la trae la variable dbUrl, solo le pasamos las options
const sequelize = new Sequelize(config.dbUrl, options);

/*
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  //para que no de un warning
  logging: console.log,
}); */

setupModels(sequelize);

// lee los modelos y crea las tables
//En este curso lo ejamos de utilizar ya que no es recomdable hacer sync en modo produccion 
//por lo cual hacemos migraciones

/* sequelize.sync(); */

module.exports = sequelize;
