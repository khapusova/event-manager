import React from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Flex, Paragraph, Button } from "@atoms";
import { updateInLocalStorage } from "@store/events/duck";
import { ROUTES } from "@utils";
import { media } from "@mixins";
import { bool, func, shape, string } from "prop-types";
import { getDateStr } from "./TableRow.helpers";

const { sizes } = media;

const Tr = styled(Flex)`
  ${({ theme: { color } }) => css`
    background-color: ${color.white};
    padding: 0;
  `}
`;

const Td = styled(Paragraph)`
  ${({ theme: { font, color, size } }) => css`
    ${sizes.maxWidthMin} {
      font-size: ${font.size.medium};
      margin: ${size.medium};
      padding: ${size.medium};
    }
    ${sizes.maxWidth} {
      margin: ${size.medium};
      padding: ${size.medium};
      font-size: ${font.size.small};
    }
    ${sizes.aboveAverageWidth} {
      padding: ${size.small};
      font-size: ${font.size.small};
    }
    ${sizes.averageWidth} {
      padding: ${size.extraSmall};
      font-size: ${font.size.tabletMedium};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMin};
    }
    ${sizes.minWidth} {
      padding: 2px;
      font-size: ${font.size.mobileMedium};
    }
    ${sizes.minMobileWidth} {
      padding: 1px;
      font-size: ${size.extraSmall};
    }
    border-top: 1px solid ${color.lightGrey};
  `}
`;

const StyledButton = styled(Button)`
  ${({
    theme: { color },
    validateButton,
    valid,
    nonVisible,
    defaultStyle
  }) => css`
    background: ${color.none};
    border-radius: 3px;
    border: none;
    color: ${validateButton ? color.green : color.red};
    color: ${valid && color.lightGrey};
    color: ${defaultStyle && color.black};
    display: ${nonVisible && "none"};
  `}
`;

const TableRow = ({ content, type, order, changeOrder }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const processedContent = type?.split("-").includes("got")
    ? {
        eventName: content.eventName,
        location: content.location,
        startDate:
          content.startDate === `""`
            ? t("EventData.unknown")
            : getDateStr(content.startDate),
        endDate:
          content.endDate === `""`
            ? t("EventData.unknown")
            : getDateStr(content.endDate),
        status: content.isValid
          ? t("EventData.validated")
          : t("EventData.notValidated"),
        submittedAt: getDateStr(content.submittedAt)
      }
    : {
        ...content,
        submittedAt: (
          <StyledButton defaultStyle onClick={changeOrder}>
            {content.submittedAt} {order ? "⇑" : "⇓"}
          </StyledButton>
        )
      };

  const handleDeleteEventButtonClick = id => async () => {
    await dispatch(
      updateInLocalStorage({
        id,
        type: "removal"
      })
    );
    window.location.reload();
  };

  const handleValidateEventButtonClick = id => () => {
    navigate(`${ROUTES.validateEvent}/${id}`);
  };

  return (
    <Tr as="tr">
      {Object.keys(processedContent).map(elemKey => (
        <Td as="td" key={elemKey}>
          {processedContent[elemKey]}
        </Td>
      ))}
      <Td as="td" className="buttons">
        <StyledButton
          {...(content.isValid && {
            disabled: true,
            valid: true
          })}
          flex
          onClick={handleValidateEventButtonClick(content.id)}
          validateButton
          {...(!type && {
            nonVisible: true
          })}
        >
          {t("ButtonNames.validate")}
        </StyledButton>
        <StyledButton
          flex
          onClick={handleDeleteEventButtonClick(content.id)}
          {...((!type || type.split("-").includes("validation")) && {
            nonVisible: true
          })}
        >
          {t("ButtonNames.delete")}
        </StyledButton>
      </Td>
    </Tr>
  );
};

TableRow.defaultProps = {
  type: null,
  order: true,
  changeOrder: null
};

TableRow.propTypes = {
  content: shape({
    eventName: string.isRequired,
    location: string.isRequired,
    StartDate: string,
    endDate: string,
    status: string,
    submittedAt: string.isRequired
  }).isRequired,
  type: string,
  order: bool,
  changeOrder: func
};

export default TableRow;
