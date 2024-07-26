import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const { routeId, fromDate, toDate, adults, children, baby } = req.body;

  if (!routeId || !fromDate || !toDate || !adults) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newQuery = {
    _type: 'query',
    route: {
      _type: 'reference',
      _ref: routeId,
    },
    fromDate: new Date(fromDate).toISOString(),
    toDate: new Date(toDate).toISOString(),
    passengers: {
      adults,
      children,
      baby,
    },
    createdAt: (new Date()).toISOString(),
  };

  try {
    const createdQuery = await client.create(newQuery);

    res.status(201).json(createdQuery);
  } catch (error) {
    console.error('Error creating new query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}