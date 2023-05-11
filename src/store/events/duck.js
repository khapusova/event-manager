/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES
} from "@utils/constants/store";

import { api } from "./api";

const initialEvent = {
  eventName: "",
  location: "",
  startDate: "",
  endDate: "",
  id: null,
  noDates: false,
  isValid: false,
  submittedAt: "",
  token: null
};

const initialState = {
  ...INITIAL_STATE,
  eventsList: []
};

const saveToLocalStorageThunkName = `${STORE_NAMES.EVENT}/saveToLocalSorage`;
const updateInLocalStorageThunkName = `${STORE_NAMES.EVENT}/updateInLocalStorage`;
const getFromLocalStorageThunkName = `${STORE_NAMES.EVENT}/getFromLocalStorage`;
const deleteFromLocalStorageThunkName = `${STORE_NAMES.EVENT}/deleteFromLocalStorage`;

export const saveToLocalStorage = createAsyncThunk(
  saveToLocalStorageThunkName,
  async (body, { rejectWithValue }) => {
    const { response, error } = await api.createEvent(body);

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);

export const updateInLocalStorage = createAsyncThunk(
  updateInLocalStorageThunkName,
  async (body, { rejectWithValue }) => {
    const { response, error } = await api.updateEvent(body);

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);

export const getFromLocalStorage = createAsyncThunk(
  getFromLocalStorageThunkName,
  async rejectWithValue => {
    const { response, error } = await api.getEvent();

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);

export const deleteFromLocalStorage = createAsyncThunk(
  deleteFromLocalStorageThunkName,
  async (body, { rejectWithValue }) => {
    const { response, error } = await api.deleteEvent(body);

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);

const eventSlice = createSlice({
  name: STORE_NAMES.EVENT,
  initialState,
  reducers: {
    createNewEvent: state => {
      const ids = state.eventsList.map(event => event.id);
      const id = ids.length === 0 ? 0 : Math.max.apply(null, ids) + 1;

      state.eventsList = [
        ...state.eventsList,
        {
          ...initialEvent,
          id
        }
      ];
    },

    setNoDates: (state, { payload }) => {
      state.eventsList = state.eventsList.map(event => {
        return event.id === payload.id
          ? { ...event, noDates: payload.noDates }
          : event;
      });
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          saveToLocalStorage.pending,
          updateInLocalStorage.pending,
          getFromLocalStorage.pending,
          deleteFromLocalStorage.pending
        ),
        state => {
          if (!state.isPending) {
            return {
              ...state,
              ...PENDING_STATE
            };
          }
          return state;
        }
      )
      .addMatcher(
        isAnyOf(
          saveToLocalStorage.rejected,
          updateInLocalStorage.rejected,
          getFromLocalStorage.rejected,
          deleteFromLocalStorage.rejected
        ),
        state => {
          if (state.isPending) {
            const newState = {
              ...state,
              ...REJECTED_STATE
            };
            return newState;
          }
          return state;
        }
      )
      .addMatcher(isAnyOf(saveToLocalStorage.fulfilled), (state, action) => {
        const newList = state.eventsList.map(event => {
          return event.id === action.payload.data.id
            ? action.payload.data
            : event;
        });

        return {
          ...FULFILLED_STATE,
          eventsList: newList
        };
      })

      .addMatcher(isAnyOf(updateInLocalStorage.fulfilled), (state, action) => {
        return {
          ...FULFILLED_STATE,
          eventsList: action.payload.response
        };
      })

      .addMatcher(isAnyOf(getFromLocalStorage.fulfilled), (state, action) => {
        return {
          ...FULFILLED_STATE,
          eventsList: action.payload.data
        };
      })

      .addMatcher(
        isAnyOf(deleteFromLocalStorage.fulfilled),
        (state, action) => {
          return {
            ...FULFILLED_STATE,
            eventsList: action.payload
          };
        }
      );
  }
});

const { actions: eventActions, reducer: eventReducer } = eventSlice;
export { eventActions, eventReducer };
