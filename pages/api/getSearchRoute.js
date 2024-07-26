import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const { fromId, toId } = req.query;

  if (!fromId || !toId) {
    return res.status(400).json({ error: 'Missing fromId or toId' });
  }

  const query = `*[_type == "route" && startingPoint._ref == $fromId && destinationPoint._ref == $toId]{
      _id,
    }`;

  try {
    const params = { fromId, toId };
    const routes = await client.fetch(query, params);
    res.status(200).json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}