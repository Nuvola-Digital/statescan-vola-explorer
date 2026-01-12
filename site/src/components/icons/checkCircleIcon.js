import styled from "styled-components";
import { ReactComponent } from "./check-circle.svg";

const CheckCircleIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default CheckCircleIcon;
