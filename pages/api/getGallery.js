import { client } from "../../lib/sanity";

export default async function handler(req, res) {
  const query = `*[_type == "gallery"]{
  _id,
  title,
  images[] {
    _key,
    "url": asset->url
  }
}`;

  try {
    const gallery = await client.fetch(query);
    res.status(200).json(gallery);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
