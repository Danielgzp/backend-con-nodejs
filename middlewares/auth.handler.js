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

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('Se requieren permisos de administrador'));
    }
  };
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
