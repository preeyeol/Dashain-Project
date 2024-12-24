const { transporter } = require("./email.config");
const {
  emailVerification_template,
  welcomeEmail_template,
  passwordReset_template,
  passwordReset_Message,
} = require("../../libs/emailTemplate");

const sendEmailCode = async (email, verificationCode) => {
  try {
    const response = transporter.sendMail({
      from: '"Dashain Platform " <preeyeol27@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Verify Your Email", // Subject line
      text: "Verify Your Email", // plain text body
      html: emailVerification_template.replace(
        "{verificationCode}",
        verificationCode
      ), //html body
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
  }
};

const welcomeEmail = async (email, username) => {
  try {
    const response = transporter.sendMail({
      from: '"Dashain Platform " <preeyeol27@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome To Dashain Platform", // Subject line
      text: "Verify Your Email", // plain text body
      html: welcomeEmail_template.replace("{CustomerName}", username), //html body
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
  }
};

const passwordReset = async (email, username, resetUrl) => {
  try {
    let templeter = passwordReset_template.replace("{username}", username);
    templeter = templeter.replace("{Reset Password}", resetUrl);

    const response = transporter.sendMail({
      from: '"Dashain Platform " <preeyeol27@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Reset your password", // Subject line
      text: "Reset Your password", // plain text body
      html: templeter,
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
  }
};

const resetSuccessful = async (email, username) => {
  try {
    const response = transporter.sendMail({
      from: '"Dashain Platform " <preeyeol27@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Password reset successfully", // Subject line
      text: "Password reset successfully", // plain text body
      html: passwordReset_Message.replace("{username}", username), //html body
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  sendEmailCode,
  welcomeEmail,
  passwordReset,
  resetSuccessful,
};
