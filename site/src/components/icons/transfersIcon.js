import styled from "styled-components";
import { ReactComponent as Transfers } from "./transfers.svg";

const TransfersIcon = styled(Transfers)`
  path {
    stroke: none;
    fill: ${(p) => p.theme.fontPrimary};
  }
`;

export default TransfersIcon;
