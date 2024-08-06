import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { client } from "../../lib/sanity";
import nodemailer from "nodemailer";

const template = ({
  status,
  user,
  route,
  transferDateFrom,
  transferDateTo,
  message = '',
  reservationCode,
  whatsappNotification,
  flightNumber,
  airline,
  driverMessage,
  priceDetails,
  additionalServices,
  vehicle
}) => {
  const { firstName, lastName, emailAddress, phoneNumber } = user;
  const { startingPoint, destinationPoint } = route;

  const formatAdditionalServices = (services) => {
    return services.map(service => `
      <tr>
        <td>${service?.name?.en || service?.name?.tr || service?.name?.ru || service?.name?.de}</td>
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
          <p>Your reservation has been received. The details are below:</p>
        `;
      case 'confirmed':
        return `
          <p>Your reservation has been confirmed. The details are below:</p>
        `;
      case 'cancelled':
        return `
          <p>Your reservation has been cancelled. The details are below:</p>
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
          <td><strong>Destination:</strong></td>
          <td>${startingPoint?.name} - ${destinationPoint?.name}</td>
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

  const { _id, _type, type = "", emailAddress } = body;

  if (_type !== "transfer") {
    return res.status(200).json({ message: "Not a transfer document, skipping" });
  }

  const query = `*[_type == "transfer" && _id == $id][0]{
    type,
    user->{
        _id,
        emailAddress,
        firstName,
        lastName,
        phoneNumber
    },
    route->{
      startingPoint->{
        name
      },
      destinationPoint->{
        name
      }
    },
    additionalServices[]{
      returnCount,
      outboundCount,
      "name": service->name
    },
    reservationCode,
    whatsappNotification,
    flightNumber,
    airline,
    dropOffLocation,
    driverMessage,
    priceDetails,
    vehicle->{
      name
    }
  }`;

  const params = { id: _id };
  const currentTransfer = await client.fetch(query, params);

  const newStatus = type || 'pending';

  const emailTo = `${currentTransfer?.user?.emailAddress},info@victoriatransfers.com`

  if (!type) {
    await client
      .patch(_id)
      .set({ type: "pending" })
      .commit();

    const info = await transporter.sendMail({
      from: "noreply@victoriatransfers.com",
      to: emailTo,
      subject: "Reservation",
      html: template({ ...req.body, status: "pending", ...currentTransfer }),
    });

    return res.status(200).json({ message: "Transfer updated with status", info });
  }

  if (type === 'pending') {
    return res.status(200).json({ message: "Transfer already in pending status" });
  }

  const info = await transporter.sendMail({
    from: "noreply@victoriatransfers.com",
    to: emailTo,
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
