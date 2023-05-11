import React, { useMemo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFromLocalStorage, setTempUser } from "@store/autho/duck";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { Flex, Button, Input, Paragraph, Spinner } from "@atoms";
import { SIGN_IN_FORM_SCHEMA, ROUTES } from "@utils";
import { media } from "@mixins";
import { signingInInputLayoutProps } from "./Form.layoutProps";

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

const SignInForm = () => {
  const { t } = useTranslation();
  const [dispatched, setDispatched] = useState(false);
  const user = useSelector(state => state.temporaryUser.user);
  const userState = useSelector(state => state.temporaryUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isButtonBlocked, setIsButtonBlocked] = useState(false);

  const { register, formState, handleSubmit } = useForm({
    defaultValues: {
      name: "signInForm"
    },
    mode: "onBlur",
    resolver: yupResolver(SIGN_IN_FORM_SCHEMA)
  });

  useEffect(() => {
    if (dispatched && user.token !== null) {
      setIsButtonBlocked(true);
      dispatch(setTempUser(user));
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
  }, [t, navigate, dispatched, dispatch, user]);

  const submit = async data => {
    const { email, password } = data;
    /* here i send the email and password to the function that
    searches for the given email in LS data
    and then compare existing password with the given one
    If this password is incorrect - function response will be "rejected" */
    await dispatch(getUserFromLocalStorage({ email, password }));
    setDispatched(true);
  };

  const memoInputList = useMemo(
    () =>
      signingInInputLayoutProps.map(inputProps => {
        return (
          <Flex key={inputProps.id}>
            <StyledInput
              {...register(`${inputProps.id}`)}
              placeholder={inputProps.placeholder}
              type={inputProps.type}
              spaceMarginY="small"
              block
              full
              {...(((userState.isRejected && inputProps.id === "password") ||
                formState.errors[inputProps.id]) && {
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
            {userState.isRejected && inputProps.id === "password" ? (
              <StyledParagraph className="err">
                {t("ErrorMessages.invPassword")}
              </StyledParagraph>
            ) : (
              ""
            )}
          </Flex>
        );
      }),
    [formState.errors, register, userState.isRejected, t]
  );

  const toDisplay = userState.isPending ? (
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
      {t("ButtonNames.signIn")}
    </SubmitButton>
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

export default SignInForm;
