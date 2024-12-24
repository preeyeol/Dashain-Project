const emailVerification_template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #007bff;
            padding: 20px;
            color: white;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .footer {
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>OTP Verification</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your OTP code is: <span class="otp-code">{verificationCode}</span></p>
            <p>Please use this code to complete your verification process.</p>
            <p>Thank you!</p>
        </div>
        <div class="footer">
            <p>&copy; 2023 Your Company. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const welcomeEmail_template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <title>Welcome Email Template</title>
</head>
<body>
  <div style="font-family: Poppins">
    <!--   HEADER   -->
    <table role="header" width="100%">
      <tr>
        <td bgcolor="#003BB3" style="padding: 40px 64px; font-size: 14px;">
   
        </td>
      </tr>
    </table>
    
    <!--   CONTENT   -->
    <table role="content" style="padding: 80px 64px; color: #363740;">
      <tr>
        <td style="font-weight: 600; font-size: 32px; line-height: 48px; color: #003BB3; padding-bottom: 56px">
          <span>Welcome To Dashain Platform! 🎉</span>
        </td>
      </tr>
      
      <tr>
        <td style="padding-bottom: 30px">
          <span>
            <span>Hi {CustomerName},</span> <br />
            <br />
          </span>
        </td>
      </tr>
      
      <tr>
        <td style="padding-bottom: 40px">
           <span>
              Thanks for signing up ! We are excited to have you here. <br />
              Our goal is to help individuals, teams (corporates & agencies) and notary publics work together on a whole different level.
            </span>
        </td>
      </tr>
      
      <tr>
        <td style="padding-bottom: 20px">
         
        </td>
      </tr>
      
      <tr>
        <td style="padding-bottom: 30px;">
          <span style="line-height: 21px;">Do not hesitate to reach out by replying to this email. We can talk you through everything you need to know to begin your journey on the right note. We’d love to hear from you.</span>
        </td>
      </tr>
      
      <tr>
        <td style="line-height: 30px;">
          Yours, <br />
          <span style="line-height: 56px; font-weight: 600;">Dashain Platform Team.</span>
        </td>
      </tr>
      
    </table>
    
    <!--    FOOTER    -->
       <table role="footer" width="100%">
      <tr align="center">
        <td  style="background: #003BB3; padding: 40px 0;">
          <div style="padding-bottom: 34px">
            <a href="#">
                <img style="padding-right: 40px" src="https://res.cloudinary.com/dtsjiqrgd/image/upload/v1636711876/facebook_yl5wto.png" alt="facebook-icon">
              </a>
            <a href="#">
            <img style="padding-right: 40px" src="https://res.cloudinary.com/dtsjiqrgd/image/upload/v1636711926/instagram_vfnpyx.png" alt="instagram-icon">
            </a>
            <a href="#">
              <img style="padding-right: 40px" src="https://res.cloudinary.com/dtsjiqrgd/image/upload/v1636712047/twitter_kfu6bd.png" alt="twitter-icon">
            </a>
            <a href="#">
            <img src="https://res.cloudinary.com/dtsjiqrgd/image/upload/v1636712011/linked-in_gkbnuo.png" alt="linked-in-icon">
            </a>
          </div>
          
          <div style="color: #fff; font-weight: 300; padding-bottom: 34px">
            <span>You are receiving this email because you are opted into Dashain Platform. <br />
            © 2021, Dashain Platform . All rights reserved.
            </span>
          </div>
          
          <div style="color: #fff; font-weight: 300;">
            <a href="#" style="text-decoration: none; color: #fff;">Unsubscribe</a>
            <span style="padding: 0 16px;">|</span>
            <a href="#" style="text-decoration: none; color: #fff;">Privacy Policy</a>
            <span style="padding: 0 16px;">|</span>
            <a href="#" style="text-decoration: none; color: #fff;">Help Center</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

const passwordReset_template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Dear {username},</p>
        <p>Please reset your password using the link provided below:</p>
        <a href="https://example.com/reset-password" class="button">{Reset Password}</a>
        <p>If you did not request this password reset, please ignore this email.</p>
        <p>Thank you!</p>
    </div>
</body>
</html>

`;

const passwordReset_Message = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Change Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Your Password Has Been Changed</h2>
        <p>Dear {username}</p>
        <p>We wanted to let you know that your password has been successfully changed. If you did not authorize this change, please contact our support team immediately.</p>
        <p><a href="mailto:support@example.com">Contact Support</a></p>
        <p>Thank you,</p>
        <p>Dashain Platform Team</p>
        <div class="footer">
            <p>If you have any questions, feel free to reach out to us.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = {
  emailVerification_template,
  welcomeEmail_template,
  passwordReset_template,
  passwordReset_Message,
};
