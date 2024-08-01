import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  const locale = req.headers["accept-language"] ?? 'en';

  const query = `*[_type == "faq"]{
  _id,
  category,
  "question": question.${locale},
  "answer": answer.${locale}
} | order(category asc)`;

  try {
    const faqs = await client.fetch(query);

    let categories = []

    const groupedFaqs = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
        categories.push(faq.category);
      }
      acc[faq.category].push({
        question: faq.question,
        answer: faq.answer
      });
      return acc;
    }, {});

    res.status(200).json({
      categories,
      faqs: groupedFaqs
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}