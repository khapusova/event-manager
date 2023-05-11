import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@utils";
import { Flex, Button, Paragraph, Input } from "@atoms";
import { eventActions, deleteFromLocalStorage } from "@store/events/duck";
import { media } from "@mixins";
import { arrayOf, string, shape, number, bool, func } from "prop-types";
import { Modal } from "../Modal";
import { matchedList } from "./TableRow.helpers";

const { sizes } = media;

const StyledInput = styled(Input)`
  ${({ theme: { color, size, font } }) => css`
    border: 1px solid ${color.lightGrey};
    border-radius: 3px;
    box-shadow: 1px 1px 1px ${color.lightGrey};
    height: ${size.normal};
    width: ${size.sixteen};
    ${sizes.maxWidthMin} {
      font-size: ${font.size.medium};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.averageWidth} {
      font-size: ${font.size.tabletMedium};
      height: ${size.medium};
    }
    ${sizes.belowAverageWidth} {
      width: ${size.full};
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
      font-size: ${font.size.normal};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.medium};
    }
  `}
`;

const StyledButton = styled(Button)`
  ${({ theme: { color, font }, createButton }) => css`
    ${sizes.maxWidthMin} {
      font-size: ${font.size.medium};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.averageWidth} {
      font-size: ${font.size.tabletMedium};
    }
    ${sizes.minWidth} {
      margin: 0;
    }
    background: ${color.none};
    border: 2px solid ${createButton ? color.green : color.red};
    border-radius: 3px;
    color: ${createButton ? color.green : color.red};
  `}
`;

const TableHeader = ({ setFilteredEvents, eventsList, getToFirstScreen }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputData, setInputData] = useState("");
  const [evsList] = useState(eventsList);

  const user = useSelector(state => state.temporaryUser.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const timerID = setTimeout(() => {
      setFilteredEvents(matchedList(evsList, inputData));
    }, 2000);

    return () => {
      clearTimeout(timerID);
    };
  }, [inputData, evsList, setFilteredEvents]);

  const handleCreateButtonPress = async () => {
    await dispatch(eventActions.createNewEvent());
    navigate(ROUTES.manageEvent);
  };

  const setData = e => {
    setInputData(e.target.value);
    getToFirstScreen();
  };

  const handleDeleteButtonPress = () => {
    setIsModalVisible(true);
  };

  const goBack = () => {
    setIsModalVisible(false);
  };

  const executeOnApprove = async () => {
    await dispatch(deleteFromLocalStorage(user));
  };

  return (
    <Flex justifyBetween flex>
      {isModalVisible && (
        <Modal
          onApprove={executeOnApprove}
          onClose={goBack}
          buttonText={t("ButtonNames.deleteAll")}
          question={t("Claims.eventsWillBeLost")}
        />
      )}
      <Flex spaceMargin="small" block>
        <StyledParagraph>{t("Claims.createdEvents")}</StyledParagraph>
        <StyledInput
          spaceMarginTop="small"
          placeholder="Search"
          type="text"
          onChange={setData}
          value={inputData}
        />
      </Flex>
      <Flex flexInline spaceMarginX="big" textCenter selfCenter>
        <StyledButton
          spaceMarginX="small"
          createButton
          onClick={handleCreateButtonPress}
        >
          {t("ButtonNames.createEvent")}
        </StyledButton>
        <StyledButton spaceMarginTop="normal" onClick={handleDeleteButtonPress}>
          {t("ButtonNames.deleteAll")}
        </StyledButton>
      </Flex>
    </Flex>
  );
};

TableHeader.propTypes = {
  setFilteredEvents: func.isRequired,
  eventsList: arrayOf(
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
  ).isRequired,
  getToFirstScreen: func.isRequired
};

export default TableHeader;
