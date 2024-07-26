import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const query = `*[_type == "additional_service"]{
        _id,
        name,
        description,
        price,
        "image": image.asset->url
      }`;

  try {
    const services = await client.fetch(query);
    res.status(200).json(services);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}