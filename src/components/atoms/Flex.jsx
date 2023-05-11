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
  flexSizing,
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

const Flex = styled.div`
  ${({ width, height }) => css`
    width: ${width};
    height: ${height};

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
    
    ${flexSizing}
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

export default Flex;
