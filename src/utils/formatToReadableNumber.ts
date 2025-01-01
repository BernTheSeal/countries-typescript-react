export const formatToReadableNumber = (item: string) => {
  const removeChar = item.replace(/[^0-9\.]/g, "");
  const removeDat = removeChar.replace(/\./g, "");
  const formatedNum = removeDat.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formatedNum;
};
