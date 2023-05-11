import { css } from "styled-components";

const flexSizing = ({ grow = 1, shrink = 1, basis = "auto" }) =>
  css`
    flex: ${grow} ${shrink} ${basis};
  `;

const flexFloat = ({ rightHalf, leftHalf, full, half }) => {
  switch (true) {
    case full:
      return css`
        width: 100%;
      `;
    case half:
      return css`
        width: 50%;
      `;
    case rightHalf:
      return css`
        width: 50%;
        float: right;
      `;
    case leftHalf:
      return css`
        width: 50%;
        float: left;
      `;
    default:
      return null;
  }
};

const flexDisplay = ({ inlineFlex, flex, block, inlineBlock }) => {
  switch (true) {
    case block:
      return css`
        display: block;
      `;
    case inlineBlock:
      return css`
        display: inline-block;
      `;
    case inlineFlex:
      return css`
        display: inline-flex;
      `;
    case flex:
      return css`
        display: flex;
      `;
    default:
      return null;
  }
};

const flexDirection = ({ column, columnReverse, inherit, row, rowReverse }) => {
  switch (true) {
    case inherit:
      return css`
        flex-direction: inherit;
      `;
    case column:
      return css`
        flex-direction: column;
      `;
    case columnReverse:
      return css`
        flex-direction: column-reverse;
      `;
    case row:
      return css`
        flex-direction: row;
      `;
    case rowReverse:
      return css`
        flex-direction: row-reverse;
      `;
    default:
      return null;
  }
};

const textAlign = ({
  textCenter,
  textJustify,
  textLeft,
  textRight,
  textStart,
  textEnd
}) => {
  switch (true) {
    case textCenter:
      return css`
        text-align: center;
      `;
    case textJustify:
      return css`
        text-align: justify;
      `;
    case textRight:
      return css`
        text-align: right;
      `;
    case textLeft:
      return css`
        text-align: left;
      `;
    case textStart:
      return css`
        text-align: start;
      `;
    case textEnd:
      return css`
        text-align: end;
      `;
    default:
      return null;
  }
};

const alignContent = ({
  contentBetween,
  contentCenter,
  contentEnd,
  contentStart,
  contentStretch
}) => {
  switch (true) {
    case contentBetween:
      return css`
        align-content: between;
      `;
    case contentCenter:
      return css`
        align-content: center;
      `;
    case contentEnd:
      return css`
        align-content: end;
      `;
    case contentStart:
      return css`
        align-content: stretch;
      `;
    case contentStretch:
      return css`
        align-content: stretch;
      `;
    default:
      return null;
  }
};

const alignItems = ({
  itemsBaseline,
  itemsCenter,
  itemsEnd,
  itemsStart,
  itemsStretch
}) => {
  switch (true) {
    case itemsBaseline:
      return css`
        align-items: baseline;
      `;
    case itemsCenter:
      return css`
        align-items: center;
      `;
    case itemsEnd:
      return css`
        align-items: flex-end;
      `;
    case itemsStart:
      return css`
        align-items: flex-start;
      `;
    case itemsStretch:
      return css`
        align-items: stretch;
      `;
    default:
      return null;
  }
};

const justifyContent = ({
  justifyAround,
  justifyBetween,
  justifyCenter,
  justifyEnd,
  justifyEvenly,
  justifyStart
}) => {
  switch (true) {
    case justifyAround:
      return css`
        justify-content: space-around;
      `;
    case justifyBetween:
      return css`
        justify-content: space-between;
      `;
    case justifyCenter:
      return css`
        justify-content: center;
      `;
    case justifyEnd:
      return css`
        justify-content: flex-end;
      `;
    case justifyEvenly:
      return css`
        justify-content: space-evenly;
      `;
    case justifyStart:
      return css`
        justify-content: flex-start;
      `;
    default:
      return null;
  }
};

const alignSelf = ({
  selfBaseline,
  selfCenter,
  selfEnd,
  selfStart,
  selfStretch
}) => {
  switch (true) {
    case selfBaseline:
      return css`
        align-self: baseline;
      `;
    case selfCenter:
      return css`
        align-self: center;
      `;
    case selfEnd:
      return css`
        align-self: flex-end;
      `;
    case selfStart:
      return css`
        align-self: flex-start;
      `;
    case selfStretch:
      return css`
        align-self: stretch;
      `;
    default:
      return null;
  }
};

const position = ({ relative, absolute, fixed }) => {
  switch (true) {
    case relative:
      return css`
        position: relative;
      `;
    case absolute:
      return css`
        position: absolute;
      `;
    case fixed:
      return css`
        position: fixed;
      `;
    default:
      return null;
  }
};

export default {
  flexSizing,
  flexDisplay,
  flexDirection,
  alignContent,
  alignItems,
  alignSelf,
  justifyContent,
  position,
  textAlign,
  flexFloat
};
