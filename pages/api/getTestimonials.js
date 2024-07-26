import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const query = `*[_type == "testimonial"]{
    _id,
    name,
    location,
    rating,
    feedback,
    "photoUrl": photo.asset->url
  }`;

  try {
    const testimonials = await client.fetch(query);
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}