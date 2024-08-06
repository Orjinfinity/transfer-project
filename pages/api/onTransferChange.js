import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

import { client } from "../../lib/sanity";

import nodemailer from "nodemailer";

const template = ({ status, firstName, lastName, phoneNumber, emailAddress, message = '' }) => {
  return status === 'pending' ? `<table>
  <tr>
    <td><strong>Name:</strong></td>
    <td>${firstName} ${lastName}</td>
  </tr>
  <tr>
    <td><strong>Date:</strong></td>
    <td>${transferDateFrom} ${transferDateTo}</td>
  </tr>
  <tr>
    <td><strong>Telefon:</strong></td>
    <td>${phoneNumber}</td>
  </tr>
  <tr>
    <td><strong>E-posta:</strong></td>
    <td>${emailAddress}</td>
  </tr>
  <tr>
    <td><strong>Mesaj:</strong></td>
    <td>${message}</td>
  </tr>
</table>`: `<table>
  </table>`;
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "mail.victoriatransfers.com",
  port: 465,
  secure: true,
  auth: {
    user: "noreply@victoriatransfers.com", // generated ethereal user
    pass: "=!q^C-(52;6(", // generated ethereal password
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

// async function readBody(readable) {
//   const chunks = [];
//   for await (const chunk of readable) {
//     chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
//   }
//   return Buffer.concat(chunks).toString("utf8");
// }

const handler = async (req, res) => {
  // const signature = req.headers[SIGNATURE_HEADER_NAME];

  // if (
  //   !(await isValidSignature(
  //     readBody(req),
  //     signature,
  //     process.env.SANITY_WEBHOOK_SECRET
  //   ))
  // ) {
  //   res.status(401).json({ success: false, message: "Invalid signature" });
  //   return;
  // }

  const { body } = req;

  if (typeof body !== "object")
    return res.status(400).json({ message: "Invalid body" });

  const { _id, _type, type = "" } = body;

  if (_type !== "transfer") {
    return res
      .status(200)
      .json({ message: "Not a transfer document, skipping" });
  }

  if (!type) {
    client
      .patch(_id)
      .set({
        type: "pending",
      })
      .commit();

      console.log('req.body', req.body);

    const info = await transporter.sendMail({
      from: "noreply@victoriatransfers.com", // sender address
      to: "enes.sefa.k@gmail.com,info@victoriatransfers.com", // list of receivers
      subject: "Reservation", // Subject line
      html: template({ ...req.body, status: "pending" }), // html body
    });

    return res
      .status(200)
      .json({ message: "Transfer updated with status", info });
  }

  const query = `*[_type == "transfer" && _id == $id][0]{
    type,
    user->{
      _id,
      emailAddress,
      firstName,
      lastName
    }
  }`;

  const params = { id: _id };
  const currentTransfer = await client.fetch(query, params);

  if (currentTransfer?.type === type) {
    return res.status(200).json({ message: "Transfer already has status" });
  }


  const info = await transporter.sendMail({
    from: "noreply@victoriatransfers.com", // sender address
    to: "enes.sefa.k@gmail.com,info@victoriatransfers.com", // list of receivers
    subject: "Reservation", // Subject line
    html: template({ ...req.body, status: currentTransfer?.type }), // html body
  });

  console.log('req.body', info);


  try {
    return res
      .status(200)
      .json({ message: "Transfer updated with distance and duration", info });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default handler;
