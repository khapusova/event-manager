import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromLocalStorage } from "@store/events/duck";
import { deleteTempUser, deleteUserFromLocalStorage } from "@store/autho/duck";
import { useTranslation } from "react-i18next";
import { media } from "@mixins";
import { Flex, Button, Paragraph } from "@atoms";
import { Modal, HeaderAutho } from "@molecules";

const { sizes } = media;

const LoggedInFlex = styled(Flex)`
  ${({ theme: { size } }) => css`
    ${sizes.belowAverageWidth} {
      margin: ${size.medium};
    }
    ${sizes.minWidth} {
      margin: ${size.small};
    }
  `}
`;
const StyledButton = styled(Button)`
  ${({ theme: { color, size, font } }) => css`
    color: ${color.white};
    font-weight: ${font.weight.bold};
    background-color: ${color.green};
    font-family: ${font.family.verdana};
    font-size: ${font.size.medium};
    height: ${size.normal};
    border-radius: 3px;
    border: none;

    ${sizes.belowAverageWidth} {
      font-size: ${font.size.small};
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

const UserProfile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.temporaryUser.user);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const logOut = () => {
    dispatch(deleteTempUser());
  };

  const deleteAccount = () => {
    setIsModalVisible(true);
  };

  const goBack = () => {
    setIsModalVisible(false);
  };

  const executeOnApprove = async () => {
    setIsModalVisible(false);
    await dispatch(deleteFromLocalStorage(user));
    await dispatch(deleteTempUser());
    await dispatch(deleteUserFromLocalStorage(user));
  };

  return (
    <>
      <HeaderAutho />
      <LoggedInFlex flex column itemsCenter justifyCenter>
        <StyledParagraph spaceMarginY="normal">
          {user.userName} {user.userSurname}
        </StyledParagraph>
        <StyledParagraph>{user.email}</StyledParagraph>
      </LoggedInFlex>
      <LoggedInFlex flex itemsCenter justifyCenter spaceMarginTop="big">
        {isModalVisible && (
          <Modal
            onApprove={executeOnApprove}
            onClose={goBack}
            buttonText={t("ButtonNames.deleteAccount")}
            question={t("Claims.accountWillBeDeleted")}
          />
        )}
        <StyledButton spaceMarginRight="big" onClick={logOut}>
          {t("ButtonNames.logOut")}
        </StyledButton>
        <StyledButton onClick={deleteAccount}>
          {t("ButtonNames.deleteAccount")}
        </StyledButton>
      </LoggedInFlex>
    </>
  );
};

export default UserProfile;
