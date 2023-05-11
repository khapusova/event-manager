import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationForm, HeaderFlex, TimeLeftFlex } from "@molecules";
import { Flex } from "@atoms";
import { VALIDATION_FORM_SCHEMA } from "@utils";
import { media } from "@mixins";
import { useTranslation } from "react-i18next";
import { shape, bool, func } from "prop-types";

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

const ValidateEventFlex = ({ location, onSuccess, setDispatched }) => {
  const params = useParams();
  const { t } = useTranslation();

  const methods = useForm({
    defaultValues: {
      name: "validateEventForm"
    },
    resolver: yupResolver(VALIDATION_FORM_SCHEMA)
  });
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const stopTimer = () => {
    setIsTimerVisible(false);
  };

  return (
    <FormProvider {...methods}>
      <StyledFlex block>
        <HeaderFlex text={t("Claims.inputValidationCode")} />
        <Flex flex>
          {isTimerVisible && <TimeLeftFlex seconds={20} />}
          <ValidationForm
            seconds={20}
            id={parseInt(params.id, 10)}
            stopTimer={stopTimer}
            isTimerValid={isTimerVisible}
            location={location}
            onSuccess={onSuccess}
            setDispatched={setDispatched}
          />
        </Flex>
      </StyledFlex>
    </FormProvider>
  );
};

ValidateEventFlex.defaultProps = {
  location: {
    state: {
      from: false
    }
  }
};

ValidateEventFlex.propTypes = {
  location: shape({
    state: shape({
      from: bool
    })
  }),
  onSuccess: func.isRequired,
  setDispatched: func.isRequired
};

export default ValidateEventFlex;
