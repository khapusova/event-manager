import React from "react";
import styled, { css } from "styled-components";
import { Flex, Paragraph, Button } from "@atoms";
import { media } from "@mixins";
import { func, string } from "prop-types";

const { sizes } = media;

const StyledFlex = styled(Flex)`
  ${({ theme: { color, size } }) => css`
    left: ${size.half};
    transform: translateX(-${size.half});
    top: ${size.quarter};
    background-color: ${color.darkred};
    border-radius: ${size.medium};
    transition: width 2s;
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { color, font } }) => css`
    color: ${color.white};
    font-size: ${font.size.normal};
    ${sizes.maxWidth} {
      font-size: ${font.size.medium};
    }
    ${sizes.aboveAverageWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
      padding: 0;
      margin: 0;
    }
  `}
`;

const StyledButton = styled(Button)`
  ${({ theme: { color, font }, close }) => css`
    ${!close && "height: 30px;"}
    ${close && "right: 0;"}
    ${close && "top: 0;"}
    background-color: ${color.none};
    border: 2px solid ${color.white};
    border-radius: ${close ? "20px" : "5px"};
    color: ${color.white};
    &:hover {
      background-color: ${color.white};
      color: ${color.darkred};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.medium};
    }
    ${sizes.aboveAverageWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
    }
  `}
`;

const Modal = ({ question, buttonText, onApprove, onClose }) => (
  <StyledFlex fixed block spacePadding="normal">
    <StyledButton
      textCenter
      absolute
      close
      spaceMargin="small"
      onClick={onClose}
    >
      ✖
    </StyledButton>
    <StyledParagraph textCenter spaceMargin="small">
      {question}
    </StyledParagraph>
    <StyledButton full spaceMarginTop="small" onClick={onApprove}>
      {buttonText}
    </StyledButton>
  </StyledFlex>
);

Modal.propTypes = {
  onApprove: func.isRequired,
  onClose: func.isRequired,
  buttonText: string.isRequired,
  question: string.isRequired
};
export default Modal;
