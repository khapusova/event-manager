import React from "react";
import styled, { css } from "styled-components";

const Spinner = styled.div`
  ${({ theme: { color } }) => css`
    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 10px solid ${color.lightGrey};
      border-top: 10px solid ${color.black};
      border-radius: 50%;
      animation: spinner 1.5s linear infinite;
    }
  `}
`;

const SpinnerLoad = () => {
  return (
    <Spinner className="spinner-container">
      <Spinner className="loading-spinner" />
    </Spinner>
  );
};

export default SpinnerLoad;
