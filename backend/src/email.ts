import * as sgMail from '@sendgrid/mail';

export const emailTemplate = function (validation_code: string) {
  return `
    <!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Welcome To Study With Me AI!</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			background-color: #f5f5f5;
			padding: 20px;
		}

		.container {
			background-color: #fff;
			border-radius: 5px;
			padding: 20px;
			max-width: 500px;
			margin: 0 auto;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Validation Email</h1>
		<p>Thank you for registering for our service. To activate your account, please use the following code:</p>
		<h2>${validation_code}</h2>
		<p>If you did not request this validation code, please ignore this message.</p>
		<p>Best regards,</p>
		<p>The Validation Team</p>
		<br>
		<a href="https://studywithme.ai/help">Contact Us</a>
	</div>
</body>
</html>`;
};

export const sendValidationEmail = async function ({
  email,
  userInputCode, // OTP
}) {
  const msg = {
    to: email, // Change to your recipient
    from: 'ai.studywithme@gmail.com', // Change to your verified sender
    subject: 'Welcome to Study With Me AI!',
    html: emailTemplate(userInputCode),
  };
  sgMail
    .send(msg)
    .then((e) => {
      console.log('Email sent', e);
    })
    .catch((error) => {
      console.error(error);
    });
};
