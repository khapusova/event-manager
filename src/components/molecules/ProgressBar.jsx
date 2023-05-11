import React from "react";
import styled, { css } from "styled-components";
import { Flex } from "@atoms";
import { number } from "prop-types";

const ProgressFlex = styled(Flex)`
  ${({ theme: { color, size } }) => css`
    background-color: ${color.lightgrey};
    border-radius: ${size.small};
  `}
`;
const Progress = styled(Flex)`
  ${({ theme: { color, size } }) => css`
    background-color: ${color.blue};
    height: ${size.small};
    border-radius: ${size.medium};
    transition: 1s ease;
  `}
`;

const ProgressBar = ({ width, percent }) => {
  const progress = percent * width;

  return (
    <ProgressFlex style={{ width: `${width}px` }}>
      <Progress style={{ width: `${progress}px` }} />
    </ProgressFlex>
  );
};

ProgressBar.propTypes = {
  width: number.isRequired,
  percent: number.isRequired
};

export default ProgressBar;
