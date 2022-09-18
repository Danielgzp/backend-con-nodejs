// const { Client } = require('pg');

// async function getConnection() {
//   const client = new Client({
//     host: 'localhost',
//     port: 5432,
//     user: 'nico',
//     password: 'admin123',
//     database: 'my_store'
//   });
//   await client.connect();
//   return client;
// }

// module.exports = getConnection;

//ya esto no se usa

const { Client } = require('pg');
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost);
const DATABASE = encodeURIComponent(config.dbName);
const PORT = encodeURIComponent(config.dbPort);
const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`;

async function getConnection() {
  const client = new Client({ connectionString: URI });
  await client.connect();
  return client;
}

module.exports = getConnection;
