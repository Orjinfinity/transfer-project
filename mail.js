const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.victoriatransfers.com",
  port: 587,
  secure: false,
  auth: {
    user: "victoriatransfer",
    pass: "x7eLq_G[X37?",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
