import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "@store/events/duck";
import { Flex, Spinner } from "@atoms";
import { HeaderAutho } from "@molecules";
import { NoEventFlex } from "@organisms";

const NoEventToValidate = () => {
  const dispatch = useDispatch();
  const [dispatched, setIsDispatched] = useState(false);

  const user = useSelector(state => state.temporaryUser.user);
  const eventsList = useSelector(state => state.eventsList.eventsList).filter(
    ev => ev.token === user.token && ev.isValid === false
  );

  useEffect(() => {
    const toLoad = async () => {
      await dispatch(getFromLocalStorage());
      setIsDispatched(true);
    };

    toLoad();
  }, [dispatch]);

  return (
    <>
      <HeaderAutho />
      {dispatched && <NoEventFlex events={eventsList} />}
      {!dispatched && (
        <Flex flex justifyCenter itemsCenter spaceMargin="big">
          <Spinner />
        </Flex>
      )}
    </>
  );
};

export default NoEventToValidate;
