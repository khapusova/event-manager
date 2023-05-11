import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { Flex } from "@atoms";
import { TableHeader, TableRow, TablePagination } from "@molecules";
import { media } from "@mixins";
import { arrayOf, func, number, string, bool, shape } from "prop-types";
import { rowNames } from "./EventsFlex.layoutProps";

const { sizes } = media;

const StyledFlex = styled(Flex)`
  ${({ theme: { color, size } }) => css`
    background-color: ${color.white};
    border-radius: 3px;
    min-width: 240px;
    ${sizes.belowAverageWidth} {
      margin-top: ${size.medium};
      margin-left: ${size.small};
      margin-right: ${size.small};
    }
    ${sizes.minMobileWidth} {
      margin-top: ${size.small};
      margin-left: ${size.extraSmall};
      margin-right: ${size.extraSmall};
    }
  `}
`;

const Table = styled(Flex)`
  ${({ theme: { size } }) => css`
    width: ${size.full};
    border-collapse: collapse;
  `}
`;

const EventsFlex = ({
  setFilteredEvents,
  allEvents,
  eventsList,
  tempScreen,
  setSelect,
  select,
  forward,
  back,
  numOfPages,
  order,
  changeOrder,
  getToFirstScreen
}) => {
  const memoEventsList = useMemo(() => {
    if (allEvents.length === 0) return [];
    return allEvents[tempScreen].map(event => (
      <TableRow content={event} type="got" key={event.id} />
    ));
  }, [allEvents, tempScreen]);

  return (
    <StyledFlex block spaceMargin="big">
      <TableHeader
        setFilteredEvents={setFilteredEvents}
        eventsList={eventsList}
        getToFirstScreen={getToFirstScreen}
      />
      <Table as="table">
        <tbody>
          <TableRow
            content={rowNames}
            order={order}
            changeOrder={changeOrder}
          />
          {memoEventsList.map(event => event)}
        </tbody>
      </Table>
      {allEvents.length !== 0 && (
        <TablePagination
          setSelect={setSelect}
          select={select}
          forward={forward}
          back={back}
          numOfPages={numOfPages}
        />
      )}
    </StyledFlex>
  );
};

EventsFlex.propTypes = {
  allEvents: arrayOf(
    arrayOf(
      shape({
        eventName: string.isRequired,
        location: string.isRequired,
        startDate: string.isRequired,
        endDate: string.isRequired,
        id: number.isRequired,
        noDates: bool.isRequired,
        isValid: bool.isRequired,
        submittedAt: string.isRequired
      })
    ).isRequired
  ).isRequired,
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
    })
  ).isRequired,
  setSelect: func.isRequired,
  select: number.isRequired,
  forward: func.isRequired,
  back: func.isRequired,
  numOfPages: string.isRequired,
  setFilteredEvents: func.isRequired,
  order: bool.isRequired,
  changeOrder: func.isRequired,
  tempScreen: number.isRequired,
  getToFirstScreen: func.isRequired
};

export default EventsFlex;
