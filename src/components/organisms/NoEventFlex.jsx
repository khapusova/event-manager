import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Flex, Paragraph } from "@atoms";
import { TableRow } from "@molecules";
import { media } from "@mixins";
import { arrayOf, string, shape, number, bool } from "prop-types";
import { useTranslation } from "react-i18next";

const { sizes } = media;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { color, font } }) => css`
    color: ${color.white};
    font-weight: ${font.weight.bold};
    ${sizes.maxWidthMin} {
      font-size: ${font.size.normal};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.medium};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.small};
    }
  `}
`;

const Table = styled(Flex)`
  ${() => css`
    border-collapse: collapse;
    min-width: 240px;
  `}
`;

const NoEventFlex = ({ events }) => {
  const { t } = useTranslation();

  const memoEventsList = useMemo(
    () =>
      events.map(event => (
        <TableRow key={event.id} content={event} type="got-validation" />
      )),
    [events]
  );

  return (
    <>
      <StyledParagraph spaceMargin="normal" textCenter>
        {t("Claims.noEvent")}
      </StyledParagraph>
      <StyledParagraph textCenter spaceMargin="normal">
        {t("Claims.canBeValidated")}
      </StyledParagraph>
      <Table half spaceMargin="auto" as="table">
        <tbody>{memoEventsList.map(el => el)}</tbody>
      </Table>
    </>
  );
};

NoEventFlex.propTypes = {
  events: arrayOf(
    shape({
      eventName: string.isRequired,
      location: string.isRequired,
      startDate: string.isRequired,
      endDate: string.isRequired,
      id: number.isRequired,
      noDates: bool.isRequired,
      isValid: bool.isRequired,
      submittedAt: string.isRequired
    }).isRequired
  ).isRequired
};

export default NoEventFlex;
