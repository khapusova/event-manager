import React from "react";
import styled, { css } from "styled-components";
import { Flex, Paragraph } from "@atoms";
import { string } from "prop-types";

const StyledFlex = styled(Flex)`
  ${({ theme: { color } }) => css`
    background-color: ${color.white};
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { color, font } }) => css`
    color: ${color.green};
    font-weight: ${font.weight.bold};
    font-size: ${font.size.normal};
    @media (max-width: 570px) {
      font-size: ${font.size.medium};
    }
  `}
`;

const HeaderFlex = ({ text }) => (
  <StyledFlex spacePaddingY="small">
    <StyledParagraph textCenter>{text}</StyledParagraph>
  </StyledFlex>
);

HeaderFlex.defaultProps = {
  text: null
};

HeaderFlex.propTypes = {
  text: string
};

export default HeaderFlex;
