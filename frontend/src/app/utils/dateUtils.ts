export const getDateFromTimteStamp = (timeStamp: any) => {
  const date = new Date(timeStamp);

  return (
    date.getDay() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    (date.getUTCFullYear() % 100)
  );
};
