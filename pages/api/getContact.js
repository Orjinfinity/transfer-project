import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const query = `*[_type == "contactInfo"][0] {
      phoneNumber,
      emailAddress,
      physicalAddress,
      workingHours,
      socialMedia
  }`;

  try {
    const contactInfo = await client.fetch(query);
    res.status(200).json(contactInfo);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}