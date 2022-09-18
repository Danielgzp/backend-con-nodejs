const jwt = require('jsonwebtoken');
const { config } = require('./config/config');

const secret = config.jwtSecret;

//Esto es para establecer un tiempo de expiracion para el token
const jwtConfig = {
  expiresIn: '7d',
};
const payload = {
  sub: 1,
  role: 'customer',
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret, jwtConfig);
console.log(token);
