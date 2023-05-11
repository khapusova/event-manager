import {
  saveEventInLocalStorage,
  updateEventInLocalStorage,
  getEventsFromLocalStorage,
  deleteEventsFromLocalStorage
} from "../localStorage";

const createEvent = data =>
  new Promise(resolve => {
    setTimeout(() => {
      saveEventInLocalStorage(data);
    }, 1000);
    resolve({ response: { data }, error: null });
  });

const updateEvent = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const response = updateEventInLocalStorage(data);
      resolve({ response: { response }, error: null });
    }, 1000);
  });

const getEvent = () =>
  new Promise(resolve => {
    setTimeout(() => {
      const data = getEventsFromLocalStorage();
      resolve({ response: { data }, error: null });
    }, 1000);
  });

const deleteEvent = data =>
  new Promise(resolve => {
    setTimeout(() => {
      const response = deleteEventsFromLocalStorage(data);
      resolve({ response, error: null });
    }, 1000);
  });

export const api = {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent
};
