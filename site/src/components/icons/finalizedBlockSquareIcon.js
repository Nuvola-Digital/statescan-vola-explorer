import styled from "styled-components";
import { ReactComponent } from "./finalized-block-square.svg";

const FinalizedBlockSquareIcon = styled(ReactComponent)`
  path {
    stroke: none;
    fill: ${({ theme }) => theme.fontPrimary};
  }

  linearGradient {
    stop:first-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }

    stop:last-child {
      stop-color: ${({ theme }) => theme.fontPrimary};
    }
  }
`;

export default FinalizedBlockSquareIcon;
