import styled from "styled-components";
import { ReactComponent } from "./pulse.svg";

const TotalEventsIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default TotalEventsIcon;
