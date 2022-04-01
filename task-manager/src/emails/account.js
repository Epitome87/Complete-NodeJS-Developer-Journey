const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'rubywep@hotmail.com',
    subject: 'Welcome to Task Manager!',
    text: `Welcome to the app, ${name}! Feel free to share your opinions on it!`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'rubywep@hotmail.com',
    subject: 'Sorry to see you go',
    text: `${name}, you have successfully cancelled your Task Manager account. We hope to see you back soon!`,
  });
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
