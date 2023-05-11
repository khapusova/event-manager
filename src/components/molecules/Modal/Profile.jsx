import React, { useMemo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Flex, Paragraph, Spinner } from "@atoms";
import { media } from "@mixins";
import { shape, string } from "prop-types";
import { getFromLocalStorage } from "@store/events/duck";

const { sizes } = media;

const StyledFlex = styled(Flex)`
  ${({ theme: { color, size } }) => css`
    right: 0;
    top: ${size.big};
    background-color: ${color.white};
    border: 5px solid ${color.black};
    border-radius: ${size.medium};
    transition: width 2s;
    ${sizes.minWidth} {
      padding: ${size.exxxxsmall};
    }
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { color, font } }) => css`
    color: ${color.black};
    ${sizes.maxWidthMin} {
      font-size: ${font.size.medium};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.minWidth} {
      font-size: ${font.size.tabletMedium};
    }
  `}
`;

const Profile = ({ user }) => {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const eventsList = useSelector(state => state.eventsList.eventsList);

  useEffect(() => {
    const timerID = setTimeout(async () => {
      await dispatch(getFromLocalStorage());
      setDispatched(true);
    }, 2000);

    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const userEvents = useMemo(
    () => eventsList.filter(event => event.token === user.token),
    [eventsList, user.token]
  );

  const toDisplay = dispatched ? (
    <StyledParagraph>Total created events: {userEvents.length}</StyledParagraph>
  ) : (
    <Flex flex justifyCenter itemsCenter>
      <Spinner />
    </Flex>
  );
  return (
    <StyledFlex fixed block spaceMargin="extrasmall" spacePadding="normal">
      <StyledParagraph textCenter spaceMargin="small">
        {user.userName} {user.userSurname}
      </StyledParagraph>
      <StyledParagraph textCenter spaceMargin="small">
        {user.email}
      </StyledParagraph>
      {toDisplay}
    </StyledFlex>
  );
};

Profile.propTypes = {
  user: shape({
    userName: string,
    userSurname: string,
    email: string,
    password: string,
    token: string
  }).isRequired
};
export default Profile;
