import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { css } from "styled-components";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "@hookform/error-message";
import { ROUTES } from "@utils";
import { eventActions, saveToLocalStorage } from "@store/events/duck";
import { Input, Button, Flex, Paragraph } from "@atoms";
import { media } from "@mixins";
import { func, bool } from "prop-types";
import { inputLayoutProps } from "./Form.layoutProps";

const { sizes } = media;

const StyledInput = styled(Input)`
  ${({ theme: { size, font, color }, invalidVariant }) => css`
    font-family: ${font.family.verdana};
    height: ${size.normal};
    border-color: ${invalidVariant ? color.darkred : color.white};

    ${sizes.maxWidthMin} {
      font-size: ${font.size.medium};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
      height: ${size.medium};
    }
    ${sizes.minMobileWidth} {
      font-size: ${font.size.tabletMin};
    }
  `}
`;

const StyledCneckboxInput = styled(Input)`
  ${({ theme: { size } }) => css`
    border-radius: 3px;
    width: ${size.tenth};
    height: ${size.medium};
    ${sizes.aboveAverageWidth} {
      min-width: ${size.small};
    }
  `}
`;

const CreateButton = styled(Button)`
  ${({ theme: { color, size, font }, disabled }) => css`
    background-color: ${disabled ? color.lightGrey : color.green};
    font-family: ${font.family.verdana};
    font-weight: bold;
    color: ${color.white};
    border-radius: 3px;
    border: none;
    height: ${size.normal};
    font-size: ${font.size.medium};

    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
      height: ${size.medium};
    }
  `}
`;

const StyledFlexBackground = styled(Flex)`
  ${({ theme: { color } }) => css`
    background-image: ${color.gradient};
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { color, font } }) => css`
    color: ${color.white};
    font-size: ${font.size.medium};
    &.err {
      font-size: ${font.size.small};
      color: ${color.lightViolet};
    }

    ${sizes.maxWidth} {
      font-size: ${font.size.small};
      &.err {
        font-size: ${font.size.small};
      }
    }
    ${sizes.belowAverageWidth} {
      &.err {
        font-size: ${font.size.tabletMedium};
      }
      font-size: ${font.size.tabletMedium};
    }
  `}
`;

const EventForm = ({ noDates, setNoDates }) => {
  const id = useSelector(
    state =>
      state.eventsList.eventsList[state.eventsList.eventsList.length - 1].id
  );
  const user = useSelector(state => state.temporaryUser.user);

  const { t } = useTranslation();

  const { handleSubmit, register, formState } = useFormContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isButtonBlocked, setIsButtonBlocked] = useState(false);

  useEffect(() => {
    dispatch(eventActions.setNoDates({ noDates, id }));
  }, [dispatch, noDates, id]);

  const submit = data => {
    setIsButtonBlocked(true);
    dispatch(
      saveToLocalStorage({
        eventName: data.eventName,
        location: data.location,
        startDate: JSON.stringify(data.startDate),
        endDate: JSON.stringify(data.endDate),
        noDates: data.noDates,
        isValid: false,
        submittedAt: JSON.stringify(new Date()),
        token: user.token,
        id
      })
    );

    setTimeout(() => {
      navigate(`${ROUTES.validateEvent}/${id}`, { state: { from: true } });
    }, 3000);

    toast.success(t("SuccessMessages.success"), {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const memoInputList = useMemo(
    () =>
      inputLayoutProps.map(inputProps => {
        return (
          <Flex key={inputProps.id}>
            <StyledInput
              {...(noDates && inputProps.type === "date" && { disabled: true })}
              {...register(`${inputProps.id}`)}
              placeholder={inputProps.placeholder}
              type={inputProps.type}
              spaceMarginY="small"
              block
              full
              {...(formState.errors[inputProps.id] && { invalidVariant: true })}
            />
            <ErrorMessage
              errors={formState.errors}
              name={inputProps.id}
              render={({ message }) => (
                <StyledParagraph className="err">{message}</StyledParagraph>
              )}
            />
          </Flex>
        );
      }),
    [register, formState.errors, noDates]
  );

  return (
    <Flex flex rightHalf>
      <StyledFlexBackground
        as="form"
        justifyCenter
        inlineBlock
        spacePadding="small"
        onSubmit={handleSubmit(submit)}
      >
        {memoInputList}
        <Flex flex justifyBetween itemsCenter>
          <StyledParagraph>{t("Claims.unknownDate")}</StyledParagraph>
          <StyledCneckboxInput
            type="checkbox"
            {...register("noDates", {
              onChange: () => setNoDates(prev => !prev)
            })}
          />
        </Flex>
        <CreateButton
          spaceMarginTop="small"
          full
          itemsCenter
          type="submit"
          disabled={isButtonBlocked}
        >
          {t("ButtonNames.createEvent")}
        </CreateButton>
      </StyledFlexBackground>
    </Flex>
  );
};

EventForm.propTypes = {
  noDates: bool.isRequired,
  setNoDates: func.isRequired
};

export default EventForm;
