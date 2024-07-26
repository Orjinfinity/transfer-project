import { client } from "../../lib/sanity";

export default async function handler(req, res) {
  const { startingPointId } = req.query;

  if (!startingPointId) {
    return res.status(400).json({ error: "Missing startingPointId" });
  }

  const query = `*[_type == "route" && startingPoint._ref == $startingPointId]{
    destinationPoint->{
      _id,
      name,
      type
    }
  } | order(destinationPoint.name) [0..-1] {
    destinationPoint {
      _id,
      name,
      type
    }
  }`;

  try {
    const params = { startingPointId };
    const results = await client.fetch(query, params);
    const destinationPoints = results.map((route) => route.destinationPoint);
    const uniqueDestinationPoints = Array.from(
      new Set(destinationPoints.map((a) => a._id))
    ).map((id) => {
      return destinationPoints.find((a) => a._id === id);
    });

    const groupedByType = uniqueDestinationPoints.reduce(
      (acc, uniqueDestinationPoint) => {
        const { type = "other" } = uniqueDestinationPoint;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(uniqueDestinationPoint);
        return acc;
      },
      {}
    );

    res.status(200).json(groupedByType);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
