import styled from "styled-components";
import { ReactComponent } from "./pulse.svg";

const TotalEventsIcon = styled(ReactComponent)`
  path {
    stroke: none;
    fill: ${({ theme }) => theme.fontPrimary};
  }
`;

export default TotalEventsIcon;
