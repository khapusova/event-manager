import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { eventReducer } from "./events/duck";
import { userReducer } from "./autho/duck";

const rootReducer = combineReducers({
  eventsList: eventReducer,
  temporaryUser: userReducer
});

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: true,
  reducer: rootReducer
});

export default store;
