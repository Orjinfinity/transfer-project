import { client } from "../../lib/sanity";

export default async function handler(req, res) {
  const query = `*[_type == "route"] {
    "startingPoint": startingPoint->{
      _id,
      name,
      type
    }
  } | order(startingPoint.name) [0..-1] {
    startingPoint {
      _id,
      name,
      type
    }
  }`;

  try {
    const results = await client.fetch(query);

    const startingPoints = results.map((route) => route.startingPoint);
    const uniqueStartingPoints = Array.from(
      new Set(startingPoints.map((a) => a._id))
    ).map((id) => {
      return startingPoints.find((a) => a._id === id);
    });

    const groupedByType = uniqueStartingPoints.reduce(
      (acc, uniqueStartingPoint) => {
        const { type = "other" } = uniqueStartingPoint;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(uniqueStartingPoint);
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
