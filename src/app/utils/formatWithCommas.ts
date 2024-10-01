export const formatWithCommas = (value: string) => {
  const removeZeros = value.replace(/^0+/, "");

  return removeZeros.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
