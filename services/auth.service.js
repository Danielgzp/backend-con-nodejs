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
    //Aqui eliminamos el recovery token de la respuesta
    delete user.dataValues.recoveryToken;

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

  async sendRecoveryPassword(email) {
    const user = await service.findByEmail(email);
    //Si no existe ese correo en la db pues, no le da permiso
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const jwtConfig = {
      expiresIn: '10min',
    };
    //Cree un nuevo secret para los token de los emails para mas seguridad
    const token = jwt.sign(payload, config.jwtEmailSecret, jwtConfig);
    const link = `http://myfrontend.com/recovery?token=${token}`;

    //Viene de la funcion update del user.service
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: `Daniel C.A <${config.emailUser}>`,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    const rta = await this.sendMail(mail);

    return rta;
  }

  //Funcion para cambiar la contrasenia
  async changePassword(token, newPassword) {
    try {

     //veryficamos y firmamos el token que nos llega al correo
     //Cree un nuevo secret para los token de los emails para mas seguridad
      const payload = jwt.verify(token, config.jwtEmailSecret);

      //Buscamos el usuario a partir del payload.sub, que vendria siendo el id del usuario encriptado
      //dentro del token
      const user = await service.findOne(payload.sub);

      //Si el token que esta en la base de datos asignado al usuario es diferente al que llega por paramatro
      //Es el decir al que esta como query en el link de la url que nos llega al correo
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      //Encriptamos la nueva contrasenia que va a ingresar el usuario
      const hash = await bcrypt.hash(newPassword, 10);

      //actualizamos los datos de ese usuario en la base de datos
      //Se actualiza su contrasenia ya encriptada y el token que se le habia asignado para recuperar la contrasenia
      //se borra o se deja inactivo colocandole null, asi ya no puede usar el mismo token otra ves
      //Para volver a cambiar la contrasenia, sino que tiene que generar un token nuevo
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    //Esta es la configuracion del servidor de correos, puede ser una de pruebas o una real
    //como en este caso que es gmail o puede ser microsoft
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      //Esta es la config de la cuenta desde donde se enviara el email
      //la password se obtiene  desde la ceunta de google remitente
      auth: { user: config.emailUser, pass: config.emailPassword },
    });

    await transporter.sendMail(infoMail);

    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
