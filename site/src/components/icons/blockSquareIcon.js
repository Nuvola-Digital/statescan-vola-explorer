import styled from "styled-components";
import { ReactComponent as BlockSquare } from "./block-square.svg";

const BlockSquareIcon = styled(BlockSquare)`
  path {
    stroke: none;
    fill: ${({ theme }) => theme.fontPrimary};
  }
`;

export default BlockSquareIcon;
