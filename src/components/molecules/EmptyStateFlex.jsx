import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { media } from "@mixins";
import { ROUTES } from "@utils";
import { Flex, Button, Paragraph } from "@atoms";

const { sizes } = media;

const StyledFlex = styled(Flex)`
  ${({ theme: { color, size } }) => css`
    background-color: ${color.lightViolet};
    border-radius: 2px;
    box-shadow: 0px 0.7px #595959;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 40%;

    ${sizes.belowAverageMin} {
      width: ${size.third};
    }
    ${sizes.belowAverageMax} {
      width: ${size.sixteen};
    }
    ${sizes.minWidth} {
      width: ${size.twoH};
      padding-left: ${size.small};
      padding-right: ${size.small};
    }
  `}
`;

const CreateButton = styled(Button)`
  ${({ theme: { font, color, size } }) => css`
    color: ${color.green};
    border: 1px solid ${color.green};
    border-radius: 2px;
    background-color: ${color.none};
    width: ${size.nineteen};
    @media (min-width: 1150px) {
      font-size: ${font.size.medium};
    }
    @media (max-width: 650px) {
      font-size: ${font.size.small};
    }
    @media (max-width: 570px) {
      font-size: ${font.size.small};
    }
    @media (max-width: 350px) {
      font-size: ${font.size.tabletMedium};
    }
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: font }) => css`
    @media (min-width: 1150px) {
      font-size: ${font.size.medium};
    }
    @media (max-width: 650px) {
      font-size: ${font.size.small};
    }
  `}
`;

const EmptyStateFlex = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const click = () => {
    navigate(ROUTES.manageEvent);
  };

  return (
    <StyledFlex column itemsCenter flex absolute spacePaddingY="small">
      <StyledParagraph spaceMarginBottom="small" spacePadding="small">
        {t("Claims.noEventsAvailable")}
      </StyledParagraph>
      <CreateButton onClick={click}>{t("ButtonNames.createIt")}</CreateButton>
    </StyledFlex>
  );
};

export default EmptyStateFlex;
