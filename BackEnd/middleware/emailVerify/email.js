const { transporter } = require("./email.config");
const {
  emailVerification_template,
  welcomeEmail_template,
} = require("../../libs/emailTemplate");

const sendVerificationCode = async (email, verificationCode) => {
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
      text: "Welcome To Dashain Platform", // plain text body
      html: welcomeEmail_template.replace("{CustomerName}", username), //html body
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendVerificationCode, welcomeEmail };
