const jwt = require('jsonwebtoken');
const { config } = require('./config/config');

const secret = config.jwtSecret;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY2MzUzODM0Mn0.8I5NhI2-qEV7WjUvScUwrulzHsEZSpCWFFINjhc1k-c';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
