import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getFromLocalStorage } from "@store/events/duck";
import { Spinner, Flex } from "@atoms";
import { EmptyStateFlex, HeaderAutho } from "@molecules";
import { useDispatch, useSelector } from "react-redux";
import { EventsFlex } from "@organisms";
import { distributedByNumber, getStr } from "./RootPath.helper";

const RootPath = () => {
  const [dispathed, setDispatched] = useState(false);
  const eventsList = useSelector(state => state.eventsList.eventsList);
  const user = useSelector(state => state.temporaryUser.user);

  const dispatch = useDispatch();

  const [tempScreen, setTempScreen] = useState(0);
  const [numOfPages, setNumOfPages] = useState("");

  const [possibleData, setPossibleData] = useState(6);
  const [notMatched, setNotMatched] = useState(false);

  const [latestFirst, setLatestFirst] = useState(true);

  const changeOrder = () => {
    setLatestFirst(prev => !prev);
  };

  const userEvents = useMemo(
    () => eventsList.filter(ev => ev.token === user.token),
    [eventsList, user]
  );

  const [searchedEvents, setSearchedEvents] = useState(userEvents);

  useEffect(() => {
    if (searchedEvents.length === 0 && userEvents.length !== 0 && !notMatched) {
      setSearchedEvents(userEvents);
    }
  }, [userEvents, searchedEvents, notMatched]);

  const setFilteredEvents = newEvents => {
    setNotMatched(true);
    setSearchedEvents(newEvents);
  };

  const sortedByDate = useCallback(
    increasingOrder => {
      const lst = [...searchedEvents];

      lst.sort((a, b) => {
        const aDate = a.submittedAt.substr(1, a.submittedAt.length - 2);
        const bDate = b.submittedAt.substr(1, b.submittedAt.length - 2);
        if (increasingOrder) return new Date(bDate) - new Date(aDate);
        return new Date(aDate) - new Date(bDate);
      });

      return lst;
    },
    [searchedEvents]
  );

  const sortedEvents = sortedByDate(latestFirst);

  const distributedByNumberList = useMemo(
    () => distributedByNumber(sortedEvents, possibleData),
    [possibleData, sortedEvents]
  );

  useEffect(() => {
    const executeOnLoad = async () => {
      await dispatch(getFromLocalStorage());
      setDispatched(true);
    };
    executeOnLoad();
  }, [dispatch]);

  useEffect(() => {
    if (distributedByNumberList.length !== 0) {
      setNumOfPages(
        getStr(
          searchedEvents,
          distributedByNumberList,
          tempScreen,
          possibleData
        )
      );
    }
  }, [searchedEvents, distributedByNumberList, tempScreen, possibleData]);

  const getToFirstScreen = () => {
    setTempScreen(0);
  };

  const setSelect = data => {
    setPossibleData(data);
    setTempScreen(0);
  };

  const forward = () => {
    if (tempScreen + 1 < distributedByNumberList.length) {
      setTempScreen(prev => prev + 1);
    }
  };

  const back = () => {
    if (tempScreen - 1 >= 0) {
      setTempScreen(prev => prev - 1);
    }
  };

  const toDisplay =
    userEvents.length !== 0 ? (
      <EventsFlex
        allEvents={distributedByNumberList}
        eventsList={sortedEvents}
        tempScreen={tempScreen}
        setSelect={setSelect}
        select={possibleData}
        forward={forward}
        back={back}
        numOfPages={numOfPages}
        setFilteredEvents={setFilteredEvents}
        order={latestFirst}
        changeOrder={changeOrder}
        getToFirstScreen={getToFirstScreen}
      />
    ) : (
      <EmptyStateFlex />
    );

  return (
    <>
      <HeaderAutho />
      {!dispathed ? (
        <Flex flex justifyCenter itemsCenter spaceMargin="big">
          <Spinner />
        </Flex>
      ) : (
        toDisplay
      )}
    </>
  );
};

export default RootPath;
