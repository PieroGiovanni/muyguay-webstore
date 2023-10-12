export const getDateFromTimteStamp = (timeStamp: any) => {
  const date = new Date(timeStamp);
  const day = date.getDate(); // Get the day of the month
  const month = date.getMonth() + 1; // Get the month (add 1 to make it 1-based)
  const year = date.getFullYear() % 100; // Get the last two digits of the year

  return (
    (day < 10 ? "0" : "") +
    day +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (year < 10 ? "0" : "") +
    year
  );
};
