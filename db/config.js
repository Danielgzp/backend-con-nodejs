const { config } = require('./../config/config');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    //igualmente la url de la db la recibimos de la variable
    //y no configurandola como esta comentado en la parte de arriba
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    //Para el ssl reglas para deploy con heroku
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};