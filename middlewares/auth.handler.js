const boom = require('@hapi/boom');

const { config } = require('../config/config.js');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {

    //aqui digo si la api key es igual al valor mi variable de entorno entonces esta autorizado
    //a entrar a la ruta
    next();
  } else {
    //En caso de que no sea igual envia un mensaje de no autorizado
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey };
