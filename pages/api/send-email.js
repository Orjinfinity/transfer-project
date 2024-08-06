import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
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
        res.status(500).json({ status: "ERROR", message: e.message });
      } else {
        res.status(200).json({ status: "OK", messageId: info.messageId });
      }
    });
  
  } catch (e) {
    res.status(500).json({ status: "ERROR", message: e.message });
  }
}
