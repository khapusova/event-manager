/* eslint-disable prettier/prettier */
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.color.lightPurple};
    margin: 0;
    *,
    *::before,
    *::after {
      box-sizing: content-box;
    }

    ul[class],
    ol[class] {
      padding: 0;
    }

    body,
    h1,
    h2,
    h3,
    h4,
    p,
    ul[class],
    ol[class],
    li,
    figure,
    figcaption,
    blockquote,
    dl,
    dd {
      margin: 0;
    }

    root {
      min-height: 100%;
      scroll-behavior: smooth;
      text-rendering: optimizeSpeed;
      line-height: 1.5;
    }

    ul[class],
    ol[class] {
      list-style: none;
    }

    a:not([class]) {
      text-decoration-skip-ink: auto;
    }

    img {
      max-width: 100%;
      display: block;
    }

    article > * + * {
      margin-top: 1em;
    }

    input,
    button,
    textarea,
    select {
      font: inherit;
    }
  }
`;

export default GlobalStyles;
