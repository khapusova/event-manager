import { css } from "styled-components";

const margin = ({ spaceMargin, theme }) => {
  switch (spaceMargin) {
    case "auto":
      return css`
        margin: auto;
      `;
    case "none":
      return css`
        margin: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        margin: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        margin: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        margin: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        margin: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        margin: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const marginY = ({ spaceMarginY, theme }) => {
  switch (spaceMarginY) {
    case "none":
      return css`
        margin-top: ${theme.spacing.none};
        margin-bottom: ${theme.spacing.none};
      `;
    case "small":
      return css`
        margin-top: ${theme.spacing.small};
        margin-bottom: ${theme.spacing.small};
      `;
    case "extrasmall":
      return css`
        margin-top: ${theme.spacing.extrasmall};
        margin-bottom: ${theme.spacing.extrasmall};
      `;
    case "normal":
      return css`
        margin-top: ${theme.spacing.normal};
        margin-bottom: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        margin-top: ${theme.spacing.big};
        margin-bottom: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        margin-top: ${theme.spacing.extrabig};
        margin-bottom: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const marginX = ({ spaceMarginX, theme }) => {
  switch (spaceMarginX) {
    case "none":
      return css`
        margin-left: ${theme.spacing.none};
        margin-right: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        margin-left: ${theme.spacing.extrasmall};
        margin-right: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        margin-left: ${theme.spacing.small};
        margin-right: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        margin-left: ${theme.spacing.normal};
        margin-right: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        margin-left: ${theme.spacing.big};
        margin-right: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        margin-left: ${theme.spacing.extrabig};
        margin-right:: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const marginTop = ({ spaceMarginTop, theme }) => {
  switch (spaceMarginTop) {
    case "none":
      return css`
        margin-top: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        margin-top: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        margin-top: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        margin-top: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        margin-top: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        margin-top: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const marginRight = ({ spaceMarginRight, theme }) => {
  switch (spaceMarginRight) {
    case "none":
      return css`
        margin-right: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        margin-right: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        margin-right: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        margin-right: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        margin-right: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        margin-right: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const marginBottom = ({ spaceMarginBottom, theme }) => {
  switch (spaceMarginBottom) {
    case "none":
      return css`
        margin-bottom: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        margin-bottom: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        margin-bottom: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        margin-bottom: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        margin-bottom: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        margin-bottom: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const marginLeft = ({ spaceMarginLeft, theme }) => {
  switch (spaceMarginLeft) {
    case "none":
      return css`
        margin-left: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        margin-left: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        margin-left: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        margin-left: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        margin-left: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        margin-left: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

export default {
  margin,
  marginX,
  marginY,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop
};
