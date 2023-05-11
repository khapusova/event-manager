import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Flex, Paragraph } from "@atoms";
import { media } from "@mixins";

const { sizes } = media;

const StyledFlex = styled(Flex)`
  ${({ theme: { color } }) => css`
    background-color: ${color.lightViolet};
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { font } }) => css`
    font-size: ${font.size.medium};
    ${sizes.aboveAverageWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
    }
  `}
`;

const MessageFlex = () => {
  const { t } = useTranslation();

  return (
    <StyledFlex flex leftHalf>
      <StyledParagraph spacePaddingY="big" spacePaddingX="small">
        {t("Claims.fullEventDetailsInDashboard")}
      </StyledParagraph>
    </StyledFlex>
  );
};

export default MessageFlex;
