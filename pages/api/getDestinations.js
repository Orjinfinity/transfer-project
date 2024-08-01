import { client } from '../../lib/sanity';

const getTopTransferPoints = async () => {
  const query = `*[_type == "route" && startingPoint->type == $type]{
    _id,
    "startingPointId": startingPoint->_id,
    "destinationPointId": destinationPoint->_id,
    distance,
    duration,
    "name": destinationPoint->name,
    "vehiclePrices": vehiclePrices[]{
        price,
        "id": vehicle->_id
      }
  }`;

  const params = { type: 'airport' };
  const results = await client.fetch(query, params);

  // Transfer noktalarını sayarak en çok tekrar edenleri bulalım
  const transferPointCount = results.reduce((acc, curr) => {
    const transferPointId = curr.destinationPointId;
    if (transferPointId) {
      if (!acc[transferPointId]) {
        acc[transferPointId] = { ...curr, count: 0 };
      }
      acc[transferPointId].count += 1;
    }
    return acc;
  }, {});

  const topTransferPointIds = Object.keys(transferPointCount)
    .map((id) => ({ id, ...transferPointCount[id] }))
    .sort((a, b) => b.count - a.count)

  return topTransferPointIds;
};

const getDestinationDetailsByTransferPoints = async (topTransferPoints) => {
  const query = `*[_type == "destination" && location._ref in $ids]{
    _id,
    title,
    "locationId": location->_id,
    "location": location->name,
    "imageUrl": image.asset->url
  }`;

  const params = { ids: topTransferPoints.map(tp => tp.id) };
  const results = await client.fetch(query, params);

  // Ekstra bilgileri (sayımlar) ekle
  return results.map(destination => {
    const transferPointInfo = topTransferPoints.find(tp => tp.id === destination.locationId);
    return {
      ...destination,
      ...transferPointInfo,
      distance: (transferPointInfo.distance / 1000).toFixed(2),
      minutes: Math.floor(transferPointInfo.duration / 60),
      minPrice: Math.min(transferPointInfo.vehiclePrices.map(vp => vp.price || Infinity))
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