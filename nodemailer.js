const nodemailer = require('nodemailer');
const {config} = require('./config/config')

async function sendMail() {

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
  let info = await transporter.sendMail({
    from: `Daniel <${config.emailUser}>`,
    to: 'naibyspaez@gmail.com',
    subject: 'Hola',
    text: 'Que tal tu dia',
    html: '<b>Que tal tu dia</b>',
  });
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
sendMail();
