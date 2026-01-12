import styled from "styled-components";
import { ReactComponent } from "./graph-increment.svg";

const GraphIncrementIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default GraphIncrementIcon;
