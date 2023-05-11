import styled, { css } from "styled-components";
import { marginMixin, paddingMixin, flexboxMixin } from "@mixins";

const {
  padding,
  paddingX,
  paddingY,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop
} = paddingMixin;

const {
  margin,
  marginX,
  marginY,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop
} = marginMixin;

const {
  flexDisplay,
  flexDirection,
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  position,
  textAlign,
  flexFloat
} = flexboxMixin;

const Input = styled.input`
  ${css`
    ${margin}
    ${marginX}
    ${marginY}
    ${marginTop}
    ${marginBottom}
    ${marginRight}
    ${marginLeft}
 
    ${padding}
    ${paddingX}
    ${paddingY}
    ${paddingTop}
    ${paddingBottom}
    ${paddingRight}
    ${paddingLeft}
      
    ${flexDisplay}
    ${flexDirection}
    ${alignContent}
    ${alignItems}
    ${alignSelf}
    ${justifyContent}
    ${position}
    ${textAlign}
    ${flexFloat}
  `};
`;

export default Input;
