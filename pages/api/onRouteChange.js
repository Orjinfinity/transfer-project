import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

import { client } from "../../lib/sanity";
import { getRouteDistanceAndDuration } from "../../utils/getDistanceAndDuration";

const getLocationFromTransferPoint = async (pointId) => {
  const point = await client.getDocument(pointId);
  const { location } = point;
  if (!location) {
    return null;
  }
  return `${location.lat},${location.lng}`;
};

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

  const { _id, _type, startingPoint, destinationPoint, duration, distance } =
    body;


  if (_type !== "route") {
    return res.status(200).json({ message: "Not a route document, skipping" });
  }

  const currentRoute = await client.fetch(
    `*[_type == "route" && _id == $id][0]{
    duration,
    distance
  }`,
    {
      id: _id,
    }
  );

  if (
    currentRoute?.duration === duration &&
    currentRoute?.distance === distance
  ) {
    return res
      .status(200)
      .json({ message: "Route already has distance and duration" });
  }

  try {
    const startingLocation = await getLocationFromTransferPoint(
      startingPoint._ref
    );
    const destinationLocation = await getLocationFromTransferPoint(
      destinationPoint._ref
    );

    if (!startingLocation || !destinationLocation) {
      return res.status(400).json({
        message: "Starting or destination location not found",
      });
    }

    const { distance, duration } = await getRouteDistanceAndDuration(
      startingLocation,
      destinationLocation
    );

    await client
      .patch(_id)
      .set({
        distance: distance.value,
        duration: duration.value,
      })
      .commit();

    return res
      .status(200)
      .json({ message: "Route updated with distance and duration" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default handler;
