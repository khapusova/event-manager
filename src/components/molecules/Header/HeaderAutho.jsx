/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "@utils";
import { Flex, Paragraph, Button } from "@atoms";
import { media } from "@mixins";
import { Profile } from "../Modal";

const { sizes } = media;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { font } }) => css`
    ${sizes.aboveAverageWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
    }
  `}
`;

const Header = styled(Flex)`
  ${({ theme: { color, size } }) => css`
    width: ${size.full};
    background-color: ${color.white};
    margin: auto;
    display: flex;
    padding: auto;
  `}
`;

const StyledButton = styled(Button)`
  ${({ theme: { color, font }, disabled, navBtn }) => css`
    height: 35px;
    background-color: ${disabled
    ? color.lightGrey
    : navBtn
      ? color.white
      : color.black};
    border: ${navBtn ? `1px solid ${color.black}` : "none"};
    border-radius: 20px;
    color: ${navBtn ? color.black : color.white};
    ${sizes.aboveAverageWidth} {
      font-size: ${font.size.small};
      height: 28px;
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
      height: 22px;
    }
    ${navBtn && "padding: 5px 10px; margin: 10px;"}
  `}
`;

const HeaderAutho = ({ type }) => {
  const user = useSelector(state => state.temporaryUser.user);
  const stateLoading = useSelector(state => state.temporaryUser);
  const navigate = useNavigate();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const buttonText =
    user.token === null
      ? "Log In"
      : `${user.userName[0]}${user.userSurname[0]}`;
  const handleClick = () => {
    if (user.token === null) {
      navigate(ROUTES.authentication);
    } else {
      navigate(ROUTES.userProfile);
    }
  };

  const handleHover = () => {
    setIsPopupVisible(true);
  };

  const handleLeave = () => {
    setIsPopupVisible(false);
  };

  const navToNew = () => {
    navigate(ROUTES.manageEvent);
  };
  const navToMain = () => {
    navigate(ROUTES.root);
  };

  return (
    <Header>
      <Flex>
        <StyledButton
          navBtn
          onClick={navToMain}
          {...(stateLoading.isPending && { disabled: true })}
        >
          All events
        </StyledButton>
        <StyledButton
          navBtn
          onClick={navToNew}
          {...(stateLoading.isPending && { disabled: true })}
        >
          New event
        </StyledButton>
      </Flex>
      <Flex textEnd height="100%" spaceMargin="auto">
        {user.token !== null && isPopupVisible && <Profile user={user} />}
        <Flex
          inlineFlex
          column
          spaceMargin="extrasmall"
          {...(!type ? {
            onMouseOver: handleHover,
            onMouseLeave: handleLeave
          } : {
            onClick: !stateLoading.isPending && handleClick
          })}
        >
          <Flex flex justifyCenter>
            <StyledButton
              onClick={handleClick}
              {...(stateLoading.isPending && { disabled: true })}
            >
              {buttonText}
            </StyledButton>
          </Flex>
          {user.token !== null && (
            <StyledParagraph flex>
              {user.userName} {user.userSurname}
            </StyledParagraph>
          )}
        </Flex>
      </Flex>
    </Header>
  );
};

export default HeaderAutho;
