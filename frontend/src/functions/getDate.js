const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Note: January is 0
  const day = date.getDate();

  // Format month and day with leading zeros if needed
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;

  // Create the desired format: YYYY-MM-DD
  return (year + "-" + formattedMonth + "-" + formattedDay);
};
export default getDate;
