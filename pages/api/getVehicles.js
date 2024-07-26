import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const query = `*[_type == "vehicle"]{
        _id,
        type,
        name,
        brand,
        model,
        transmission,
        passengerCapacity,
        features,
        "imageUrl": image.asset->url
      }`;

  try {
    const vehicles = await client.fetch(query);
    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}