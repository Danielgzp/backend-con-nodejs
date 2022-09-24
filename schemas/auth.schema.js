/*

    Este schema no fue hehco durante el curso fue sacado de un aporte del video de la clase

    Este es un schema para validar los datos que tengan que ver con la autenticacion

*/

const Joi = require('joi');

const email = Joi.string().email(),
  //Aqui validamos que la password sea de 6 o mas caracteres
  password = Joi.string().min(6),
  //Aqui validamos que la newPassword sea de 6 o mas caracteres
  newPassword = Joi.string().min(6),
  //Este es un metodo para validar el token de jwt
  token = Joi.string()
  
//   .regex(
//     /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
//   );

const loginAuthSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryAuthSchema = Joi.object({
  email: email.required(),
});

const changePasswordAuthSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = {
  loginAuthSchema,
  recoveryAuthSchema,
  changePasswordAuthSchema,
};
