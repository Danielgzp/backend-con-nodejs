const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);

    //Si no existe el usuario en la base de datos pues no le da autorizacion
    if (!user) {
      throw boom.unauthorized();
    }

    //Hace uan validacion si la contrasenia ingresa es igual a la que esta en la DB de forma encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    //Si no es igua a la que estta en la base de datos, pues no le da autorizacion
    if (!isMatch) {
      throw boom.unauthorized();
    }

    //Elimina la password del response para que no sea visible por motivos de seguridad
    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    //Esto es para establecer un tiempo de expiracion para el token
    const jwtConfig = {
      expiresIn: '7d',
    };
    /*user es la instancia del usuario obtenido del modelo que tenga la propiedad Id del usuario.
      Se utiliza sub por conveniencia porque así lo maneja el standar de JWT pero 
      puede usarse el nombre que uno quiera */
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret, jwtConfig);

    //devolvemos la info del usuario y el token ya firmado
    return {
      user,
      token,
    };
  }

  async sendMail(email) {
    const user = await service.findByEmail(email);
    //Si no existe ese correo en la db pues, no le da permiso
    if (!user) {
      throw boom.unauthorized();
    }
    //Esta es la configuracion del servidor de correos, puede ser una de pruebas o una real
    //como en este caso que es gmail o puede ser microsoft
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      //Esta es la config de la cuenta desde donde se enviara el email
      //la password se obtiene  desde la ceunta de google remitente
      auth: { user: config.emailUser, pass: config.emailPassword },
    });
    await transporter.sendMail({
      from: `Daniel C.A <${config.emailUser}>`,
      to: 'danielgonzalez20020110@gmail.com',
      subject: 'Hola',
      text: 'Que tal tu dia',
      html: '<b>Que tal tu dia</b>',
    });
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
