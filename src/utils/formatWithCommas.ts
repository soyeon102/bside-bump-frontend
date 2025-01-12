export const formatWithCommas = (value: number) => {
  if (value === 0) return "0";
  const removeZeros = value.toString().replace(/^0+/, "");

  return removeZeros.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
