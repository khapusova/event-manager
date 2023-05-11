export const getDateStr = str => {
  const date = new Date(str.split(`"`)[1]);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const matchedList = (lst, toSearch) => {
  return lst.filter(
    event =>
      event.eventName.toLowerCase().indexOf(toSearch.toLowerCase()) !== -1
  );
};

export const possibleRows = [1, 2, 3, 4, 5, 6];
