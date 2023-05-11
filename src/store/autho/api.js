import {
  getUserFromLocalStorage,
  saveUserInLocalStorage,
  deleteUserFromLocalStorage,
  getTempUser,
  setTempUser,
  deleteTempUser
} from "../localStorage";

const getUser = ({ email, password }) =>
  new Promise(resolve => {
    setTimeout(() => {
      const data = getUserFromLocalStorage(email, password);

      const response = { ...data };
      delete response.password;

      resolve({ response, error: null });
    }, 3000);
  });

const deleteUser = data =>
  new Promise(resolve => {
    setTimeout(() => {
      deleteUserFromLocalStorage(data);
    }, 3000);
    resolve({ response: { data }, error: null });
  });

const saveUser = data =>
  new Promise(resolve => {
    setTimeout(() => {
      let response = { ...data };
      delete response.password;
      const user = getUserFromLocalStorage(data.email);
      if (!user) {
        saveUserInLocalStorage(data);
      } else {
        response = null;
      }

      resolve({ response, error: null });
    }, 3000);
  });

const getTemporaryUser = () =>
  new Promise(resolve => {
    setTimeout(() => {
      const data = getTempUser();
      resolve({ response: { data }, error: null });
    }, 3000);
  });

const setTemporaryUser = data =>
  new Promise(resolve => {
    setTimeout(() => {
      setTempUser(data);
    }, 3000);
    resolve({ response: { data }, error: null });
  });

const deleteTemporaryUser = () =>
  new Promise(resolve => {
    setTimeout(() => {
      deleteTempUser();
    }, 3000);
    resolve({ response: {}, error: null });
  });

export const api = {
  getUser,
  saveUser,
  deleteUser,
  getTemporaryUser,
  setTemporaryUser,
  deleteTemporaryUser
};
