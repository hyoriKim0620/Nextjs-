export const formatNumber = (number: number | string) => {
  const formattedNumber = Number(number).toLocaleString();

  return formattedNumber;
};
