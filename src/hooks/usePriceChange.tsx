import { ChangeEvent } from "react";

const usePriceChange = (setPrice: (value: number) => void) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.currentTarget.value.toString().replace(/[, ]/g, "");

    if (rawValue === "") {
      setPrice(0);
      return;
    }

    const numericValue = parseFloat(rawValue);

    if (!isNaN(numericValue)) {
      setPrice(numericValue);
    }
  };

  return { handlePriceChange };
};

export default usePriceChange;
