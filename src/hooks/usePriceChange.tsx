import { ChangeEvent } from "react";

const usePriceChange = (price: string, setPrice: (value: string) => void) => {
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.currentTarget.value.replace(/[, ]/g, "");

    if (!isNaN(Number(rawValue))) {
      setPrice(rawValue);
    }
  };

  return { handlePriceChange };
};

export default usePriceChange;
