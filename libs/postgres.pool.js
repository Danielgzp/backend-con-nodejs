const { Pool } = require('pg');

const { config } = require('../config/config');

const options = {};

if (config.isProduction) {
  //Aqui hacemos un if para saber si es produccion o desarrolo
  //Si es produccion obtenemos la url de la DB a traves de la variable dbUrl y colo el ssl segun la documentacion de Heroku
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false,
  };
} else {
  //Si es desarrollo manejamos la coneccion de la misma forma que veniamos haciendo colocando manualmente las variables de entorno
  //para crear la url
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

const pool = new Pool(options);

module.exports = pool;