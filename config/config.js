require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  //Esta variable sirve para saber si estmaos en modo produccion o no
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  jwtEmailSecret: process.env.JWT_EMAIL_SECRET,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};
module.exports = { config };

// CONFIG PARA DOCKER CON VARIALBES DE ENTORNO

/*version: "3.3"

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    ports:
      - ${DB_PORT}:${DB_PORT}
    volumes:
      - /postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=${PG_EMAIL}
      - PGADMIN_DEFAULT_PASSWORD=${PG_PASSWORD}
    ports:
      - ${PG_PORT}:${PG_REFPORT}*/
