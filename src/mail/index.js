import nodemailer from "nodemailer";

async function sendEmail({
  from = '"Fred Foo 👻" <foo@example.com>', // sender address
  to = "bar@example.com, baz@example.com", // list of receivers
  subject,
  text,
  html,
}) {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log("📭 Message sent: %s", info.messageId);
  } catch (e) {
    console.error(e);
  }
}

export { sendEmail };
