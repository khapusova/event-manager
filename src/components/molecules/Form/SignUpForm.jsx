import React, { useMemo, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { func } from "prop-types";
import { saveUserToLocalStorage } from "@store/autho/duck";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { Flex, Button, Input, Paragraph, Spinner } from "@atoms";
import { SIGN_UP_FORM_SCHEMA } from "@utils";
import { media } from "@mixins";
import { signingUpInputLayoutProps } from "./Form.layoutProps";

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

const SubmitButton = styled(Button)`
  ${({ theme: { color, size, font }, disabled }) => css`
    background-color: ${disabled ? color.lightGrey : color.green};
    font-family: ${font.family.verdana};
    font-weight: bold;
    color: ${color.white};
    font-size: ${font.size.medium};
    height: ${size.normal};
    border-radius: 3px;
    border: none;

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

const SignUpForm = ({ onSigningUp }) => {
  const { t } = useTranslation();
  const stateLoading = useSelector(state => state.temporaryUser);
  const [dispatched, setDispatched] = useState(false);
  const [isButtonBlocked, setIsButtonBlocked] = useState(false);
  const dispatch = useDispatch();

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      name: "signUpForm"
    },
    mode: "onBlur",
    resolver: yupResolver(SIGN_UP_FORM_SCHEMA)
  });

  useEffect(() => {
    if (dispatched && stateLoading.isFulfilled) {
      setIsButtonBlocked(true);
      setTimeout(() => {
        onSigningUp();
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
  }, [t, dispatched, dispatch, stateLoading, onSigningUp]);

  const submit = async data => {
    const { userName, userSurname, email, password } = data;
    await dispatch(
      saveUserToLocalStorage({
        userName,
        userSurname,
        email,
        password,
        token: `EFIwef9${email}238i32r/';r299que`
      })
    );
    setDispatched(true);
  };

  const toDisplay = stateLoading.isPending ? (
    <Flex flex justifyCenter itemsCenter>
      <Spinner />
    </Flex>
  ) : (
    <SubmitButton
      full
      itemsCenter
      type="submit"
      spaceMarginTop="small"
      disabled={isButtonBlocked}
    >
      {t("ButtonNames.signUp")}
    </SubmitButton>
  );

  const memoInputList = useMemo(
    () =>
      signingUpInputLayoutProps.map(inputProps => {
        return (
          <Flex key={inputProps.id}>
            <StyledInput
              {...register(`${inputProps.id}`)}
              placeholder={inputProps.placeholder}
              type={inputProps.type}
              spaceMarginY="small"
              block
              full
              {...(formState.errors[inputProps.id] && {
                invalidVariant: true
              })}
            />
            <ErrorMessage
              errors={formState.errors}
              name={inputProps.id}
              render={({ message }) => (
                <StyledParagraph className="err">{message}</StyledParagraph>
              )}
            />
            {stateLoading.isRejected && inputProps.id === "email" ? (
              <StyledParagraph className="err">
                {t("ErrorMessages.accountExists")}
              </StyledParagraph>
            ) : (
              ""
            )}
          </Flex>
        );
      }),
    [formState.errors, register, stateLoading.isRejected, t]
  );

  return (
    <StyledFlexBackground
      as="form"
      spaceMargin="auto"
      justifyCenter
      spacePadding="small"
      onSubmit={handleSubmit(submit)}
    >
      {memoInputList.map(data => data)}
      {toDisplay}
    </StyledFlexBackground>
  );
};

SignUpForm.propTypes = {
  onSigningUp: func.isRequired
};

export default SignUpForm;
