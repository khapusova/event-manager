import { css } from "styled-components";

const padding = ({ spacePadding, theme }) => {
  switch (spacePadding) {
    case "auto":
      return css`
        padding: auto;
      `;
    case "none":
      return css`
        padding: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        padding: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        padding: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        padding: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        padding: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        padding: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const paddingY = ({ spacePaddingY, theme }) => {
  switch (spacePaddingY) {
    case "none":
      return css`
        padding-top: ${theme.spacing.none};
        padding-bottom: ${theme.spacing.none};
      `;
    case "small":
      return css`
        padding-top: ${theme.spacing.small};
        padding-bottom: ${theme.spacing.small};
      `;
    case "extrasmall":
      return css`
        padding-top: ${theme.spacing.extrasmall};
        padding-bottom: ${theme.spacing.extrasmall};
      `;
    case "normal":
      return css`
        padding-top: ${theme.spacing.normal};
        padding-bottom: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        padding-top: ${theme.spacing.big};
        padding-bottom: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        padding-top: ${theme.spacing.extrabig};
        padding-bottom: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const paddingX = ({ spacePaddingX, theme }) => {
  switch (spacePaddingX) {
    case "none":
      return css`
        padding-left: ${theme.spacing.none};
        padding-right: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        padding-left: ${theme.spacing.extrasmall};
        padding-right: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        padding-left: ${theme.spacing.small};
        padding-right: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        padding-left: ${theme.spacing.normal};
        padding-right: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        padding-left: ${theme.spacing.big};
        padding-right: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        padding-left: ${theme.spacing.extrabig};
        padding-right:: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const paddingTop = ({ spacePaddingTop, theme }) => {
  switch (spacePaddingTop) {
    case "none":
      return css`
        padding-top: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        padding-top: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        padding-top: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        padding-top: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        padding-top: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        padding-top: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const paddingRight = ({ spacePaddingRight, theme }) => {
  switch (spacePaddingRight) {
    case "none":
      return css`
        padding-right: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        padding-right: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        padding-right: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        padding-right: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        padding-right: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        padding-right: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const paddingBottom = ({ spacePaddingBottom, theme }) => {
  switch (spacePaddingBottom) {
    case "none":
      return css`
        padding-bottom: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        padding-bottom: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        padding-bottom: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        padding-bottom: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        padding-bottom: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        padding-bottom: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

const paddingLeft = ({ spacePaddingLeft, theme }) => {
  switch (spacePaddingLeft) {
    case "none":
      return css`
        padding-left: ${theme.spacing.none};
      `;
    case "extrasmall":
      return css`
        padding-left: ${theme.spacing.extrasmall};
      `;
    case "small":
      return css`
        padding-left: ${theme.spacing.small};
      `;
    case "normal":
      return css`
        padding-left: ${theme.spacing.normal};
      `;
    case "big":
      return css`
        padding-left: ${theme.spacing.big};
      `;
    case "extrabig":
      return css`
        padding-left: ${theme.spacing.extrabig};
      `;
    default:
      return null;
  }
};

export default {
  padding,
  paddingX,
  paddingY,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop
};
