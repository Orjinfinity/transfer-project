import React, { useState, useEffect } from "react";
import { useFormatter } from "next-intl";
import Dinero from "dinero.js";
import useSWR from "swr";
import { getExchangeRates } from "service";
import { Skeleton } from "components";

const Price = ({ value }) => {
  const format = useFormatter();
  const { data, error, isLoading } = useSWR(
    "/api/getExchangeRates",
    getExchangeRates
  );

  const [formattedPrice, setFormattedPrice] = useState("Loading...");

  useEffect(() => {
    const formatPrice = async () => {
      if (data) {
        try {
          const result = await Dinero({ amount: value }).convert(
            data?.selectedCurrency,
            {
              endpoint: new Promise((resolve) =>
                resolve({
                  rates: data?.values,
                })
              ),
            }
          );

          setFormattedPrice(result.getAmount());
        } catch (error) {
          console.error("Error:", error);
          setFormattedPrice("Error");
        }
      }
    };

    formatPrice();
  }, [value, data]);

  if (isLoading) {
    return <Skeleton width="100px" height="20px" />
  }

  if (error) {
    return "Error";
  }

  return format.number(formattedPrice, {style: 'currency', currency: data?.selectedCurrency});
};

export default Price;