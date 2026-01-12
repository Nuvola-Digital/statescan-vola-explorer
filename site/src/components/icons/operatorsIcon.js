import styled from "styled-components";
import { ReactComponent } from "./operators.svg";

const OperatorsIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default OperatorsIcon;
