import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { updateInLocalStorage } from "@store/events/duck";
import { ROUTES } from "@utils";
import { Input, Button, Flex, Paragraph } from "@atoms";
import { media } from "@mixins";
import { bool, func, number, shape } from "prop-types";
import { validationInputLayoutProps } from "./Form.layoutProps";

const { sizes } = media;

const StyledFlexBackground = styled(Flex)`
  ${({ theme: { color } }) => css`
    background-image: ${color.gradient};
  `}
`;

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

const SubmitButton = styled(Button)`
  ${({ theme: { color, size, font }, disabled }) => css`
    background-color: ${disabled ? color.lightGrey : color.green};
    font-family: ${font.family.verdana};
    font-weight: bold;
    color: ${color.white};
    height: ${size.normal};
    border-radius: 3px;
    border: none;
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

const ValidationForm = ({
  seconds,
  id,
  stopTimer,
  isTimerValid,
  location,
  onSuccess,
  setDispatched
}) => {
  const { handleSubmit, register, formState } = useFormContext();
  const dispatch = useDispatch();

  const stateLoading = useSelector(state => state.eventsList);
  const [isButtonBlocked, setIsButtonBlocked] = useState(false);

  const navigate = useNavigate();
  const [inputBlocked, setInputBlocked] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    let inpBlocked;
    if (isTimerValid) {
      inpBlocked = setTimeout(() => {
        if (location.state?.from) {
          setInputBlocked(true);
        } else {
          navigate(ROUTES.root);
        }
      }, seconds * 1000);
    } else {
      clearTimeout(inpBlocked);
    }
  }, [seconds, isTimerValid, location, navigate]);

  const goBack = () => {
    navigate(ROUTES.manageEvent);
  };

  const submit = async () => {
    onSuccess();
    stopTimer();
    setIsButtonBlocked(true);
    setDispatched(false);
    await dispatch(
      updateInLocalStorage({
        id,
        type: "validation"
      })
    );
    setDispatched(true);
    if (stateLoading.isFulfilled) {
      setTimeout(() => {
        navigate(ROUTES.root);
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
    }
  };

  return (
    <Flex flex rightHalf>
      <StyledFlexBackground
        as="form"
        justifyCenter
        inlineBlock
        spacePadding="small"
        onSubmit={handleSubmit(submit)}
      >
        <StyledInput
          {...register(validationInputLayoutProps.id)}
          placeholder={t("Claims.enterCode")}
          type="text"
          maxlength="4"
          spaceMarginY="small"
          block
          full
          {...(formState.errors[validationInputLayoutProps.id] && {
            invalidVariant: true
          })}
          {...(inputBlocked && { disabled: true })}
        />
        {inputBlocked ? (
          <StyledParagraph className="err" spaceMarginY="small">
            {t("Claims.resumeCreating")}
          </StyledParagraph>
        ) : (
          <ErrorMessage
            errors={formState.errors}
            name={validationInputLayoutProps.id}
            render={({ message }) => (
              <StyledParagraph className="err" spaceMarginY="small">
                {message}
              </StyledParagraph>
            )}
          />
        )}
        <SubmitButton
          full
          itemsCenter
          type="submit"
          disabled={isButtonBlocked}
          onClick={inputBlocked ? goBack : null}
        >
          {inputBlocked
            ? t("ButtonNames.backToCreate")
            : t("ButtonNames.submit")}
        </SubmitButton>
      </StyledFlexBackground>
    </Flex>
  );
};
ValidationForm.defaultProps = {
  location: {
    state: {
      from: false
    }
  }
};

ValidationForm.propTypes = {
  id: number.isRequired,
  seconds: number.isRequired,
  stopTimer: func.isRequired,
  isTimerValid: bool.isRequired,
  location: shape({
    state: shape({
      from: bool
    })
  }),
  onSuccess: func.isRequired,
  setDispatched: func.isRequired
};

export default ValidationForm;
