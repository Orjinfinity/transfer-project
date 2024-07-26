import { client } from '../../lib/sanity';

const getTopTransferPoints = async () => {
  const query = `*[_type == "query"]{
    "_id": _id,
    "id": route->destinationPoint->_id,
    "name": route->destinationPoint->name
  }`;

  const results = await client.fetch(query);

  // Transfer noktalarını sayarak en çok tekrar edenleri bulalım
  const transferPointCount = results.reduce((acc, curr) => {
    const transferPointId = curr.id;
    const transferPointName = curr.name;
    if (transferPointId) {
      if (!acc[transferPointId]) {
        acc[transferPointId] = { name: transferPointName, count: 0 };
      }
      acc[transferPointId].count += 1;
    }
    return acc;
  }, {});

  // Sayımları bir diziye dönüştürelim ve en çok tekrar eden 5 transfer noktasını alalım
  const topTransferPointIds = Object.keys(transferPointCount)
    .map((id) => ({ id, count: transferPointCount[id].count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return topTransferPointIds;
};

const getDestinationDetailsByTransferPoints = async (transferPointIds) => {
  const query = `*[_type == "destination" && location._ref in $ids]{
    _id,
    title,
    "locationId": location->_id,
    "location": location->name,
    "imageUrl": image.asset->url
  }`;

  const params = { ids: transferPointIds.map(tp => tp.id) };
  const results = await client.fetch(query, params);

  // Ekstra bilgileri (sayımlar) ekle
  return results.map(destination => {
    const transferPointInfo = transferPointIds.find(tp => tp.id === destination.locationId);
    return {
      ...destination,
      count: transferPointInfo?.count,
    };
  });
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const topTransferPoints = await getTopTransferPoints();
      const destinationDetails = await getDestinationDetailsByTransferPoints(topTransferPoints);

      res.status(200).json(destinationDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch top destinations' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}