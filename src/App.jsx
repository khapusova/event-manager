import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import Router from "@navigation/Router";
import store from "@store/config";
import { theme, GlobalStyles } from "@styles";
import i18n from "./i18n";

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  </I18nextProvider>
);

export default App;
