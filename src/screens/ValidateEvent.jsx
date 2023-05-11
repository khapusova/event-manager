import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Flex } from "@atoms";
import { HeaderAutho } from "@molecules";
import { ValidateEventFlex } from "@organisms";
import NoEventToValidate from "./NoEventToValidate";

const ValidateEvent = () => {
  const [successfulSubmition, setSuccessfulSubmition] = useState(false);
  const [dispatched, setDispatched] = useState(true);
  const location = useLocation();

  const user = useSelector(state => state.temporaryUser.user);

  const eventsList = useSelector(state => state.eventsList.eventsList).filter(
    ev => ev.token === user.token && ev.isValid === false
  );

  const params = useParams();

  const event = eventsList.find(
    ev => ev.id === parseInt(params.id, 10) && !ev.isValid
  );

  const onSuccess = () => {
    setSuccessfulSubmition(true);
  };

  const handleDispatch = value => {
    setDispatched(value);
  };

  if (!event && !successfulSubmition) return <NoEventToValidate />;

  return (
    <>
      <HeaderAutho />
      <ValidateEventFlex
        location={location}
        onSuccess={onSuccess}
        setDispatched={handleDispatch}
      />
      {!dispatched && (
        <Flex flex justifyCenter itemsCenter spaceMargin="big">
          <Spinner />
        </Flex>
      )}
    </>
  );
};

export default ValidateEvent;
