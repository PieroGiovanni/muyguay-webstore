export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const parseStringToArray = (inputString: string): string[] => {
  const trimmedString = inputString.trim();
  if (trimmedString === "") {
    return [];
  }

  return trimmedString.split(",").map((item) => item.trim());
};

export const convertArrayToString = (array: string[]): string => {
  if (array.length === 0) {
    return "";
  }

  return array.join(", ");
};
