const { Resend } = require("resend");

const resend = new Resend("re_bAD4KdNT_PBAhzHaiFvX5NveMn6yec6Yz");

const sendMail = async ({ mail, message }) => {
  console.log(mail);
  try {
    await resend.emails.send({
      from: "He ecommerce <onboarding@resend.dev>",
      to: [mail],
      subject: messages.find((msg) => msg.name === message).subject,
      html: messages.find((msg) => msg.name === message).html,
    });
  } catch (error) {
    console.error(error);
  }
};

const messages = [
  {
    name: "register",
    subject: "¡Bienvenido a HE ecommerce! Confirmación de Registro",
    html: `
      <div style="text-align: center; background-color: #f4f4f4; padding: 20px;">
        <h1 style="color: #333; font-family: 'Arial', sans-serif;">¡Registro exitoso en HE ecommerce!</h1>
        <p style="color: #555; font-family: 'Arial', sans-serif;">Gracias por unirte a nuestra comunidad. Descubre las últimas tendencias en moda masculina.</p>
      </div>
    `,
  },
  {
    name: "login",
    subject: "¡Bienvenido de nuevo a HE ecommerce!",
    html: `
      <div style="text-align: center; background-color: #f8f8f8; padding: 20px;">
        <h1 style="color: #333; font-family: 'Arial', sans-serif;">¡Bienvenido de nuevo a HE ecommerce!</h1>
        <p style="color: #555; font-family: 'Arial', sans-serif;">Inicia sesión para explorar las últimas novedades en moda masculina.</p>
      </div>
    `,
  },
  {
    name: "forgot-password",
    subject: "Recuperación de Contraseña en HE ecommerce",
    html: `
      <div style="text-align: center; background-color: #f8fafc; padding: 20px;">
        <h1 style="color: #007bff; font-family: 'Arial', sans-serif;">Recuperación de contraseña en HE ecommerce</h1>
        <p style="color: #444; font-family: 'Arial', sans-serif;">Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el enlace a continuación para completar el proceso.</p>
        <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-family: 'Arial', sans-serif;">Restablecer Contraseña</a>
      </div>
    `,
  },
  {
    name: "bought",
    subject: "Confirmación de Compra en HE ecommerce",
    html: `
      <div style="text-align: center; background-color: #f8fafc; padding: 20px;">
        <h1 style="color: #007bff; font-family: 'Arial', sans-serif;">¡Compra exitosa en HE ecommerce!</h1>
        <p style="color: #444; font-family: 'Arial', sans-serif;">Gracias por elegirnos. Tu estilo está en camino. ¡Esperamos que disfrutes tu compra!</p>
      </div>
    `,
  },
];

module.exports = sendMail;
