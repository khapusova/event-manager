export const getEventsFromLocalStorage = () => {
  const events = JSON.parse(localStorage.getItem("data"));
  const existingData = events === null ? [] : events;
  return existingData;
};

export const saveEventInLocalStorage = data => {
  const existingData = getEventsFromLocalStorage();
  localStorage.setItem("data", JSON.stringify([...existingData, data]));
};

export const updateEventInLocalStorage = ({ id, type }) => {
  const existingData = getEventsFromLocalStorage();
  let dataToSet;

  if (type === "validation") {
    dataToSet = existingData.map(obj => {
      return obj.id === id ? { ...obj, isValid: true } : obj;
    });
  }

  if (type === "removal") {
    dataToSet = existingData.filter(obj => obj.id !== id);
  }

  localStorage.setItem("data", JSON.stringify(dataToSet));
  return dataToSet;
};

export const deleteEventsFromLocalStorage = user => {
  const existingData = getEventsFromLocalStorage();
  const dataToSet = existingData.filter(event => event.token !== user.token);
  localStorage.setItem("data", JSON.stringify(dataToSet));
  return dataToSet;
};

export const getUserFromLocalStorage = (email, password = null) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const existingData = users === null ? [] : users;
  let specificUser;
  if (password === null) {
    specificUser = existingData.find(user => user.email === email);
  } else {
    specificUser = existingData.find(
      user => user.email === email && user.password === password
    );
  }
  return specificUser;
};

export const saveUserInLocalStorage = user => {
  const users = JSON.parse(localStorage.getItem("users"));
  const existingData = users === null ? [] : users;
  localStorage.setItem("users", JSON.stringify([...existingData, user]));
};

export const deleteUserFromLocalStorage = user => {
  const users = JSON.parse(localStorage.getItem("users"));
  const existingData = users === null ? [] : users;
  const newUsers = existingData.filter(
    userElem => userElem.token !== user.token
  );
  localStorage.setItem("users", JSON.stringify(newUsers));
};

export const getTempUser = () => {
  return JSON.parse(localStorage.getItem("tempUser"));
};

export const setTempUser = data => {
  localStorage.setItem("tempUser", JSON.stringify(data));
};

export const deleteTempUser = () => {
  localStorage.removeItem("tempUser");
};
