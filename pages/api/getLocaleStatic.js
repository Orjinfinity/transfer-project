import { client } from "../../lib/sanity";

export default async function handler(req, res) {
  const locale = req.headers["accept-language"];

  if (!locale) {
    return res.status(400).json({ error: "Locale is required" });
  }

  const query = `*[_type == "localeStaticContent"]{
    key,
    "value": value[${JSON.stringify(locale)}]
  }`;

  try {
    const result = await client.fetch(query);

    // Locale bazlı dönüşüm
    const localizedContent = result.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    res.status(200).json(localizedContent);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
