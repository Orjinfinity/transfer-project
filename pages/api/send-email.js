import nodemailer from "nodemailer";

const template = ({ name,surname, phone, email, message }) => {
  return `<table>
  <tr>
    <td><strong>Ad Soyad:</strong></td>
    <td>${name} ${surname}</td>
  </tr>
  <tr>
    <td><strong>Telefon:</strong></td>
    <td>${phone}</td>
  </tr>
  <tr>
    <td><strong>E-posta:</strong></td>
    <td>${email}</td>
  </tr>
  <tr>
    <td><strong>Mesaj:</strong></td>
    <td>${message}</td>
  </tr>
</table>`;
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "mail.victoriatransfers.com",
  port: 465,
  secure: false,
  auth: {
    user: "noreply@victoriatransfers.com", // generated ethereal user
    pass: "=!q^C-(52;6(", // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  try {
    const info = await transporter.sendMail({
      from: "noreply@victoriatransfers.com", // sender address
      to: "victoriatransfers@gmail.com,info@victoriatransfers.com", // list of receivers
      subject: "iletisim formu", // Subject line
      html: template(req.body), // html body
    });

    res.status(200).json({ status: "OK", messageId: info.messageId });
  } catch (e) {
    res.status(500).json({ status: "ERROR", message: e.message });
  }
}
