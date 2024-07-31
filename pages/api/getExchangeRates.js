const BASE_CURRENCY = "EUR";

export default async function handler(req, res) {
  try {  
    const selectedCurrency = req?.cookies?.currency || BASE_CURRENCY;

    if (selectedCurrency === BASE_CURRENCY) {
      return res.status(200).json({
        selectedCurrency,
        values: {
          [BASE_CURRENCY]: 1,
        },
      });
    }

    const response = await fetch(
      `https://api.coinbase.com/v2/exchange-rates?currency=${BASE_CURRENCY}`
    );
    const data = await response.json();

    res.status(200).json({
      selectedCurrency,
      values: data?.data?.rates ?? {},
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
