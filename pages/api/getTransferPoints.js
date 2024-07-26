import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const query = `*[_type == "transfer_point"]{
        _id,
        name,
        location,
        address,
      }`;

  try {
    const transferPoints = await client.fetch(query);
    res.status(200).json(transferPoints);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}