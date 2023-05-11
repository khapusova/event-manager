import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import {
  INITIAL_STATE,
  PENDING_STATE,
  REJECTED_STATE,
  FULFILLED_STATE,
  STORE_NAMES
} from "@utils/constants/store";

import { api } from "./api";

const initialUser = {
  userName: null,
  userSurname: null,
  token: null,
  email: null
};
const initialState = {
  ...INITIAL_STATE,
  user: initialUser
};

const saveToLocalStorageThunkName = `${STORE_NAMES.USERS}/saveUserToLocalStorage`;
const getFromLocalStorageThunkName = `${STORE_NAMES.USERS}/getUsersFromLocalStorage`;
const deleteFromLocalStorageThunkName = `${STORE_NAMES.USERS}/deleteUserFromLocalStorage`;
const getTempUserThunkName = `${STORE_NAMES.USERS}/getTempUser`;
const setTempUserThunkName = `${STORE_NAMES.USERS}/setTempUser`;
const deleteTempUserThunkName = `${STORE_NAMES.USERS}/deleteTempUser`;

export const saveUserToLocalStorage = createAsyncThunk(
  saveToLocalStorageThunkName,
  async (body, { rejectWithValue }) => {
    const { response, error } = await api.saveUser(body);

    if (error) {
      return rejectWithValue(error);
    }

    if (!response) {
      return rejectWithValue("Account with this email alresdy exists");
    }

    return response;
  }
);

export const getUserFromLocalStorage = createAsyncThunk(
  getFromLocalStorageThunkName,
  async (body, { rejectWithValue }) => {
    const { response, error } = await api.getUser(body);

    if (error) {
      return rejectWithValue(error);
    }
    if (!response.token) {
      return rejectWithValue("Password is incorrect");
    }

    return response;
  }
);

export const deleteUserFromLocalStorage = createAsyncThunk(
  deleteFromLocalStorageThunkName,
  async (body, { rejectWithValue }) => {
    const { response, error } = await api.deleteUser(body);

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);

export const getTempUser = createAsyncThunk(
  getTempUserThunkName,
  async rejectWithValue => {
    const { response, error } = await api.getTemporaryUser();

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);

export const setTempUser = createAsyncThunk(
  setTempUserThunkName,
  async (body, { rejectWithValue }) => {
    const { response, error } = await api.setTemporaryUser(body);

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);
export const deleteTempUser = createAsyncThunk(
  deleteTempUserThunkName,
  async rejectWithValue => {
    const { response, error } = await api.deleteTemporaryUser();

    if (error) {
      return rejectWithValue(error);
    }

    return response;
  }
);

const userSlice = createSlice({
  name: STORE_NAMES.USERS,
  initialState,
  reducers: {
    logOut: state => {
      state.user = initialUser;
    }
  },

  extraReducers: builder => {
    builder
      .addMatcher(
        isAnyOf(
          saveUserToLocalStorage.pending,
          getUserFromLocalStorage.pending,
          deleteUserFromLocalStorage.pending,
          setTempUser.pending,
          getTempUser.pending,
          deleteTempUser.pending
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
          saveUserToLocalStorage.rejected,
          getUserFromLocalStorage.rejected,
          deleteUserFromLocalStorage.rejected,
          getTempUser.rejected,
          setTempUser.rejected,
          deleteTempUser.rejected
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

      .addMatcher(isAnyOf(saveUserToLocalStorage.fulfilled), () => {
        return {
          ...FULFILLED_STATE,
          user: initialUser
        };
      })
      .addMatcher(
        isAnyOf(getUserFromLocalStorage.fulfilled),
        (state, action) => {
          return {
            ...FULFILLED_STATE,
            user: action.payload
          };
        }
      )

      .addMatcher(isAnyOf(deleteUserFromLocalStorage.fulfilled), () => {
        return {
          ...FULFILLED_STATE,
          user: initialUser
        };
      })

      .addMatcher(isAnyOf(getTempUser.fulfilled), (state, action) => {
        return {
          ...FULFILLED_STATE,
          user: action?.payload?.data ? action.payload.data : initialUser
        };
      })

      .addMatcher(isAnyOf(setTempUser.fulfilled), (state, action) => {
        return {
          ...FULFILLED_STATE,
          user: action.payload.data
        };
      })

      .addMatcher(isAnyOf(deleteTempUser.fulfilled), () => {
        return {
          ...FULFILLED_STATE,
          user: initialUser
        };
      });
  }
});

const { actions: userActions, reducer: userReducer } = userSlice;
export { userActions, userReducer };
