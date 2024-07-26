import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const query = `*[_type == "destination"]{
        _id,
        title,
        "location": location->name,
        "imageUrl": image.asset->url
      }`;

  try {
    const destinations = await client.fetch(query);
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}