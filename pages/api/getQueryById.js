import { client } from "../../lib/sanity";

const getQueryById = async (id) => {
  const query = `*[_type == "query" && _id == $id][0]{
    _id,
    route->{
      _id,
      startingPoint->{
        _id,
        name,
        location
      },
      destinationPoint->{
        _id,
        name,
        location
      },
      price,
      distance,
      duration,
        vehiclePrices[]{
        price,
        "id": vehicle->_id
      }
    },
    fromDate,
    toDate,
    passengers,
    createdAt
  }`;

  const params = { id };
  const queryResult = await client.fetch(query, params);
  return queryResult;
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Query ID is required" });
  }

  try {
    const query = await getQueryById(id);

    const { route } = query;

    if (route?.distance || route?.duration) {
      const distanceKm = (route?.distance / 1000).toFixed(2); // 2 ondalık basamaklı kilometre

      // Süreyi saat ve dakika cinsine çevirmek
      const durationHours = Math.floor(route?.duration / 3600);
      const durationMinutes = Math.floor((route?.duration % 3600) / 60);

      return res.status(200).json({
        ...query,
        distance: distanceKm,
        duration: {
          hours: durationHours,
          minutes: durationMinutes,
        },
      });
    }

    res.status(200).json(query);
  } catch (error) {
    console.error("Error fetching query:", error);
    res
      .status(500)
      .json({ message: "Error fetching query", error: error.message });
  }
}
