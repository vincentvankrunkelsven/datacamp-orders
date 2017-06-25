const nodemailer = require('nodemailer');
const { user, pass, contact, userName } = require('./.config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
});

console.log({ user, pass });

function sendOrderEmail(text, date) {
  const mailOptions = {
    from: `"${userName}" <${user}>`,
    to: contact,
    subject: `DataCamp bestelling ${date}`,
    text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else if (info) {
      console.log('Message %s sent: %s', info.messageId, info.response);
    }
  });
}

module.exports = {
  sendOrderEmail,
};
