const sgMail = require("@sendgrid/mail");
const ENV_VARIABLE = require("../constants/env.constanst");

sgMail.setApiKey(ENV_VARIABLE.SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers("{{", "}}");

class SendEmailService {
  options = {};
  toEmail = "";

  constructor(toEmail) {
    this.toEmail = toEmail;
  }

  createMailOptions(subject, text, html) {
    return (this.options = {
      to: this.toEmail,
      from: ENV_VARIABLE.HOST_EMAIL,
      subject,
      text,
      html,
    });
  }

  sendResetPasswordEmail() {
    return sgMail.send(this.options).catch((err) => console.log(err));
  }
}

// const sendEmail = new SendEmailService("17520519@gmail.com");

// sendEmail.createMailOptions(
//     "Reset Password",
//     "testing",
//     "<p>This is a test email for reset password<p>"
// );

// sendEmail.sendResetPasswordEmail().then(console.log);

module.exports = SendEmailService;
