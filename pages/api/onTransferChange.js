import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { client } from "../../lib/sanity";
import nodemailer from "nodemailer";

const template = ({
  status,
  firstName,
  lastName,
  transferDateFrom,
  transferDateTo,
  phoneNumber,
  emailAddress,
  message = '',
  reservationCode,
  whatsappNotification,
  flightNumber,
  airline,
  dropOffLocation,
  driverMessage,
  priceDetails,
  additionalServices,
  vehicle
}) => {
  const formatAdditionalServices = (services) => {
    return services.map(service => `
      <tr>
        <td>${service.service?.name?.en || service.service?.name?.tr || service.service?.name?.ru || service.service?.name?.de}</td>
        <td>${service.outboundCount}</td>
        <td>${service.returnCount}</td>
      </tr>
    `).join('');
  };

  const formatVehicle = (vehicle) => {
    if (vehicle) {
      return `
        <tr>
          <td><strong>Vehicle:</strong></td>
          <td>${vehicle.name}</td>
        </tr>
      `;
    }
    return '';
  };

  const formatPriceDetails = (priceDetails) => {
    if (priceDetails) {
      return `
        <tr>
          <td><strong>Service Price:</strong></td>
          <td>${priceDetails.servicePrice}</td>
        </tr>
        <tr>
          <td><strong>Vehicle Price:</strong></td>
          <td>${priceDetails.vehiclePrice}</td>
        </tr>
        <tr>
          <td><strong>Route Price:</strong></td>
          <td>${priceDetails.routePrice}</td>
        </tr>
        <tr>
          <td><strong>Total Price:</strong></td>
          <td>${priceDetails.totalPrice}</td>
        </tr>
      `;
    }
    return '';
  };

  const formatWhatsappNotification = (whatsappNotification) => {
    if (whatsappNotification) {
      return `
        <tr>
          <td><strong>WhatsApp Notification:</strong></td>
          <td>${whatsappNotification ? 'Enabled' : 'Disabled'}</td>
        </tr>
      `;
    }
    return '';
  };

  const formatFlightDetails = (flightNumber, airline) => {
    if (flightNumber || airline) {
      return `
        <tr>
          <td><strong>Flight Number:</strong></td>
          <td>${flightNumber}</td>
        </tr>
        <tr>
          <td><strong>Airline:</strong></td>
          <td>${airline}</td>
        </tr>
      `;
    }
    return '';
  };

  const reservationStatusMessage = () => {
    switch (status) {
      case 'pending':
        return `
          <p>Rezervasyonunuz alınmıştır. Detaylar aşağıdadır:</p>
        `;
      case 'confirmed':
        return `
          <p>Rezervasyonunuz onaylanmıştır. Detaylar aşağıdadır:</p>
        `;
      case 'cancelled':
        return `
          <p>Rezervasyonunuz onaylanmamıştır. Detaylar aşağıdadır:</p>
        `;
      default:
        return '';
    }
  };

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Transfer ${status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      ${reservationStatusMessage()}
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td><strong>Name:</strong></td>
          <td>${firstName} ${lastName}</td>
        </tr>
        <tr>
          <td><strong>Transfer Date From:</strong></td>
          <td>${new Date(transferDateFrom).toLocaleString()}</td>
        </tr>
        <tr>
          <td><strong>Transfer Date To:</strong></td>
          <td>${new Date(transferDateTo).toLocaleString()}</td>
        </tr>
        <tr>
          <td><strong>Phone Number:</strong></td>
          <td>${phoneNumber}</td>
        </tr>
        <tr>
          <td><strong>Email Address:</strong></td>
          <td>${emailAddress}</td>
        </tr>
        <tr>
          <td><strong>Reservation Code:</strong></td>
          <td>${reservationCode}</td>
        </tr>
        ${formatVehicle(vehicle)}
        ${formatWhatsappNotification(whatsappNotification)}
        ${formatFlightDetails(flightNumber, airline)}
        <tr>
          <td><strong>Drop Off Location:</strong></td>
          <td>${dropOffLocation}</td>
        </tr>
        <tr>
          <td><strong>Message to Driver:</strong></td>
          <td>${driverMessage}</td>
        </tr>
        <tr>
          <td><strong>Message:</strong></td>
          <td>${message}</td>
        </tr>
      </table>
      <h3>Additional Services</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th>Service</th>
          <th>Outbound Count</th>
          <th>Return Count</th>
        </tr>
        ${formatAdditionalServices(additionalServices)}
      </table>
      <h3>Price Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        ${formatPriceDetails(priceDetails)}
      </table>
    </div>
  `;
};

// create reusable transporter object using the default SMTP transport
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

const handler = async (req, res) => {
  const { body } = req;

  if (typeof body !== "object")
    return res.status(400).json({ message: "Invalid body" });

  const { _id, _type, type = "" } = body;

  if (_type !== "transfer") {
    return res.status(200).json({ message: "Not a transfer document, skipping" });
  }

  const query = `*[_type == "transfer" && _id == $id][0]{
    type,
    user->{
      _id,
      emailAddress,
      firstName,
      lastName
    },
    reservationCode,
    whatsappNotification,
    flightNumber,
    airline,
    dropOffLocation,
    driverMessage,
    priceDetails,
    additionalServices,
    vehicle->{
      name
    }
  }`;

  const params = { id: _id };
  const currentTransfer = await client.fetch(query, params);

  const newStatus = type || 'pending';

  if (!type) {
    await client
      .patch(_id)
      .set({ type: "pending" })
      .commit();

    const info = await transporter.sendMail({
      from: "noreply@victoriatransfers.com",
      to: "enes.sefa.k@gmail.com,info@victoriatransfers.com",
      subject: "Reservation",
      html: template({ ...req.body, status: "pending", ...currentTransfer }),
    });

    return res.status(200).json({ message: "Transfer updated with status", info });
  }

  if (type === newStatus) {
    console.log("Transfer already has status", newStatus);
    return res.status(200).json({ message: "Transfer already has status" });
  }

  const info = await transporter.sendMail({
    from: "noreply@victoriatransfers.com",
    to: "enes.sefa.k@gmail.com,info@victoriatransfers.com",
    subject: "Reservation",
    html: template({ ...req.body, status: newStatus, ...currentTransfer }),
  });

  console.log(info);

  try {
    return res.status(200).json({ message: "Transfer updated with distance and duration", info });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default handler;
