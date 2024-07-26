import { v4 as uuidv4 } from "uuid";

import { client } from "../../lib/sanity";

function generateReservationCode() {
  const date = new Date();
  const formattedDate = date.toISOString().replace(/[-:.TZ]/g, '').slice(0, 12);
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // Rastgele 6 karakter
  const uuidPart = uuidv4().split('-')[0].toUpperCase(); // UUID'nin ilk kısmı

  return `${formattedDate}-${randomPart}-${uuidPart}`;
}

const formatAdditionalServices = (additionalServices) => {
  return Object.keys(additionalServices).map((serviceId) => {
    const { outbound: outboundCount, return: returnCount } =
      additionalServices[serviceId];
    return {
      _key: uuidv4(), // Benzersiz _key değeri
      _type: "object",
      service: {
        _type: "reference",
        _ref: serviceId,
      },
      outboundCount,
      returnCount,
    };
  });
};

const getRouteById = async (id) => {
  const query = `*[_type == "route" && _id == $id][0]{
    _id,
    price,
    vehiclePrices[]{
      price,
      "_id": vehicle->_id
    }
  }`;

  const params = { id };
  const queryResult = await client.fetch(query, params);
  return queryResult;
};

const createUser = async (user) => {
  const newUser = {
    _type: "user",
    ...user,
  };

  const result = await client.create(newUser);
  return result;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        user,
        route,
        transferDateFrom,
        transferDateTo,
        vehicle,
        additionalServices,
        price,
        whatsappNotification,
        flightNumber,
        airline,
        dropOffLocation,
        driverMessage,
      } = req.body;

      const selectedRoute = await getRouteById(route);

      if (!selectedRoute) {
        return res.status(400).json({ error: "Invalid route" });
      }

      const selectedVehicle = selectedRoute.vehiclePrices.find(
        (vehiclePrice) => vehiclePrice._id === vehicle
      );

      if (!selectedVehicle) {
        return res.status(400).json({ error: "Invalid vehicle" });
      }

      let createdUser;
      if (user) {
        createdUser = await createUser(user);
      } else {
        return res.status(400).json({ error: "Invalid user" });
      }

      const vehiclePrice = selectedVehicle?.price || 0;
      const routePrice = selectedRoute?.price || 0;
      const servicePrice = Object.values(additionalServices).reduce(
        (acc, service) =>
          acc +
          ((service?.outbound || 0) + service?.return || 0) * (service?.price || 0),
        0
      );
      const totalPrice = vehiclePrice + routePrice + servicePrice;

      if (totalPrice !== price) {
        return res.status(400).json({ error: "Invalid price" });
      }

      const formattedAdditionalServices =
        formatAdditionalServices(additionalServices);

      const priceDetails = {
        servicePrice,
        vehiclePrice,
        routePrice,
        totalPrice,
      };

      const newTransfer = {
        _type: "transfer",
        user: { _type: "reference", _ref: createdUser._id },
        route: { _type: "reference", _ref: selectedRoute._id },
        transferDateFrom,
        transferDateTo,
        vehicle: { _type: "reference", _ref: selectedVehicle._id },
        additionalServices: formattedAdditionalServices,
        paymentMethod: "bankTransfer",
        priceDetails,
        discountCode: "",
        reservationCode: generateReservationCode(),
        whatsappNotification,
        flightNumber,
        airline,
        dropOffLocation,
        driverMessage,
      };

      const result = await client.create(newTransfer);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error?.message || "Failed to create transfer" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
