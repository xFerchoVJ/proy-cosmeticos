import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
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
    subject: "Restablece tu Password",
    text: "Restablece tu Password",
    html: `
      <p>Hola: ${nombre}, has solicitado reestablecer tu password en APC - Administrador de Cosmeticos.</p>
      <p>Sigue el siguiente enlace para generar tu nuevo password: <a href="${process.env.FRONT_URL}/olvide-password/${token}">Reestablecer Password</a>
      </p>
      <p>Si tu no creaste esta cuenta puedes ignorar este mensaje.</p>
    `,
  });
  console.log(info.messageId);
};

export default emailOlvidePassword;
