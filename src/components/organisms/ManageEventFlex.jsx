import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FormProvider, useForm } from "react-hook-form";
import { eventActions, getFromLocalStorage } from "@store/events/duck";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventForm, HeaderFlex, MessageFlex } from "@molecules";
import { Spinner, Flex } from "@atoms";
import { EVENT_FORM_SCHEMA, EVENT_FORM_SCHEMA_WITHOUT_DATES } from "@utils";
import { media } from "@mixins";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const { sizes } = media;

const StyledFlex = styled(Flex)`
  ${({ theme: { size, font } }) => css`
    padding: ${size.big};
    ${sizes.maxWidth} {
      padding: ${size.normal};
    }
    ${sizes.minWidth} {
      padding: ${font.size.tabletMedium};
    }
  `}
`;

const ManageEventFlex = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [noDates, setNoDates] = useState(false);

  const [isDispatched, setIsDispatched] = useState(false);
  // in case user got access to the page trough the route -
  // id can`t be correctly generated - so we need to get data from ls first

  useEffect(() => {
    const toLoad = async () => {
      await dispatch(getFromLocalStorage());
      await dispatch(eventActions.createNewEvent());
      setIsDispatched(true);
    };

    toLoad();
  }, [dispatch]);

  const settingNoDates = () => {
    setNoDates(prev => !prev);
  };

  const methods = useForm({
    defaultValues: {
      name: "setEventForm"
    },
    mode: "onBlur",
    resolver: yupResolver(
      noDates ? EVENT_FORM_SCHEMA_WITHOUT_DATES : EVENT_FORM_SCHEMA
    )
  });

  return (
    <FormProvider {...methods}>
      {isDispatched && (
        <StyledFlex block>
          <HeaderFlex text={t("Claims.setUpEvent")} />
          <Flex flex>
            <MessageFlex />
            <EventForm noDates={noDates} setNoDates={settingNoDates} />
          </Flex>
        </StyledFlex>
      )}
      {!isDispatched && (
        <Flex flex justifyCenter itemsCenter spaceMargin="big">
          <Spinner />
        </Flex>
      )}
    </FormProvider>
  );
};

export default ManageEventFlex;
