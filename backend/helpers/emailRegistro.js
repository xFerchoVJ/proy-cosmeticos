import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASS_MAIL,
    },
  });

  //Enviar EMAIL
  const { email, nombre, token } = datos;
  const info = await transporter.sendMail({
    from: "APC - Administrador de Cosmeticos",
    to: email,
    subject: "Comprueba tu cuenta en Meeti",
    text: "Comprueba tu cuenta en Meeti",
    html: `
      <p>Hola: ${nombre}, comprueba tu cuenta en APC - Administrador de Cosmeticos.</p>
      <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONT_URL}/confirmar-cuenta/${token}">Comprobar cuenta</a>
      </p>
      <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
    `,
  });
  console.log(`Mensaje enviado ${info.messageId}`);
};

export default emailRegistro;
