import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import { Flex, Button, Paragraph } from "@atoms";
import { SignUpForm, SignInForm, HeaderFlex } from "@molecules";
import { media } from "@mixins";

const { sizes } = media;

const StyledButton = styled(Button)`
  ${({ theme: { color, font } }) => css`
    color: ${color.white};
    font-weight: ${font.weight.bold};

    text-decoration: underline;
    font-size: ${font.size.big};

    ${sizes.maxWidth} {
      font-size: ${font.size.normal};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.medium};
    }
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { color, font } }) => css`
    color: ${color.white};
    font-size: ${font.size.normal};
    font-weight: ${font.weight.bold};

    ${sizes.maxWidth} {
      font-size: ${font.size.normal};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.medium};
    }
  `}
`;

const StyledFlex = styled(Flex)`
  ${({ theme: { size } }) => css`
    ${sizes.belowAverageWidth} {
      width: ${size.seventeen};
      margin-top: ${size.medium};
    }
    ${sizes.minWidth} {
      width: ${size.nineteen};
    }
  `}
`;

const AuthenticationFlex = () => {
  const [isAccount, setIsAccount] = useState(false);
  const { t } = useTranslation();

  const handleToggleForm = () => {
    setIsAccount(prev => !prev);
  };

  const buttonText = isAccount
    ? t("ButtonNames.signUp")
    : t("ButtonNames.signIn");

  const claimHeaderText = isAccount
    ? t("Claims.signingIn")
    : t("Claims.createAccount");

  const claimText = isAccount
    ? t("Claims.haveNoAccount")
    : t("Claims.haveAccount");

  const toDisplay = isAccount ? (
    <SignInForm />
  ) : (
    <SignUpForm onSigningUp={handleToggleForm} />
  );

  return (
    <StyledFlex spaceMargin="auto" half spaceMarginY="big">
      <Flex block textCenter>
        <StyledParagraph spaceMarginBottom="small">{claimText}</StyledParagraph>
        <StyledButton as="a" onClick={handleToggleForm}>
          {buttonText}
        </StyledButton>
      </Flex>
      <Flex block spaceMarginY="small">
        <HeaderFlex text={claimHeaderText} />
        {toDisplay}
      </Flex>
    </StyledFlex>
  );
};

export default AuthenticationFlex;
