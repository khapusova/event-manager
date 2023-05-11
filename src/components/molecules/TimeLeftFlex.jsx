import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { Flex, Paragraph } from "@atoms";
import { media } from "@mixins";
import { number } from "prop-types";
import ProgressBar from "./ProgressBar";

const { sizes } = media;

const StyledFlex = styled(Flex)`
  ${({ theme: { color } }) => css`
    background-color: ${color.lightViolet};
  `}
`;

const StyledParagraph = styled(Paragraph)`
  ${({ theme: { font } }) => css`
    ${sizes.maxWidthMin} {
      font-size: ${font.size.medium};
    }
    ${sizes.maxWidth} {
      font-size: ${font.size.small};
    }
    ${sizes.belowAverageWidth} {
      font-size: ${font.size.tabletMedium};
    }
  `}
`;

const TimeLeftFlex = ({ seconds }) => {
  const [timer, setTimer] = useState(seconds);

  const [persent, setPersent] = useState(1);
  const persentForSecond = 1 / seconds;

  const [windowDimenion, setWindowDimention] = useState(window.innerWidth);
  const [widthForProgress, setWidthForProgress] = useState(
    windowDimenion * 0.1
  );

  const setWidth = () => {
    setWindowDimention(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    setWidthForProgress(windowDimenion * 0.1);
    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, [windowDimenion]);

  const updateRemainingTime = useCallback(() => {
    setTimer(prev => prev - 1);
    setPersent(prev => prev - persentForSecond);
  }, [persentForSecond]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    setTimeout(() => clearInterval(intervalID), seconds * 1000);
  }, [seconds, updateRemainingTime]);

  return (
    <StyledFlex textCenter leftHalf>
      <Flex inlineBlock spaceMarginY="normal">
        <StyledParagraph spaceMarginBottom="small">{timer}</StyledParagraph>
        <ProgressBar width={widthForProgress} percent={persent} />
      </Flex>
    </StyledFlex>
  );
};

TimeLeftFlex.propTypes = {
  seconds: number.isRequired
};

export default TimeLeftFlex;
