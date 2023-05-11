import React from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Flex, Button, Paragraph } from "@atoms";
import { media } from "@mixins";
import { func, number, string } from "prop-types";
import { possibleRows } from "./TableRow.helpers";

const { sizes } = media;

const StyledSelector = styled.select`
  ${({ theme: { color, font } }) => css`
    border: 1px solid ${color.lightGrey};
    border-radius: 3px;
    box-shadow: 1px 1px 1px ${color.lightGrey};
    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.averageWidth} {
      font-size: ${font.size.tabletMedium};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMin};
    }
    ${sizes.minWidth} {
      font-size: ${font.size.mobileMedium};
    }
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { font } }) => css`
    ${sizes.maxWidthMin} {
      font-size: ${font.size.medium};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.averageWidth} {
      font-size: ${font.size.tabletMedium};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMin};
    }
  `}
`;

const StyledButton = styled(Button)`
  ${({ theme: { color, font } }) => css`
    color: ${color.lightGrey};
    background: ${color.none};
    border: ${color.none};
    ${sizes.maxWidthMin} {
      font-size: ${font.size.normal};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.medium};
    }
    ${sizes.averageWidth} {
      padding: 5px;
      font-size: ${font.size.tabletMedium};
    }
    ${sizes.belowAverageWidth} {
      padding: 3px;
      font-size: ${font.size.small};
    }
    &: hover {
      font-weight: ${font.weight.bold};
    }
  `}
`;

const TablePagination = ({ setSelect, select, back, forward, numOfPages }) => {
  const { t } = useTranslation();

  const setData = e => {
    setSelect(parseInt(e.target.value, 10));
  };

  return (
    <Flex flex justifyEnd itemsCenter spacePaddingBottom="small">
      <StyledParagraph spaceMarginX="normal">
        {t("Claims.rowsPerPage")}
      </StyledParagraph>
      <StyledSelector value={select} onChange={setData}>
        {possibleRows.map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </StyledSelector>
      <StyledParagraph spaceMarginX="normal">{numOfPages}</StyledParagraph>
      <StyledButton onClick={back}>{`<`}</StyledButton>
      <StyledButton spaceMarginRight="small" onClick={forward}>
        {`>`}
      </StyledButton>
    </Flex>
  );
};

TablePagination.propTypes = {
  setSelect: func.isRequired,
  select: number.isRequired,
  back: func.isRequired,
  forward: func.isRequired,
  numOfPages: string.isRequired
};

export default TablePagination;
