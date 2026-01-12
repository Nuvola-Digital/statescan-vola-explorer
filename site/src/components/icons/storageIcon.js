import styled from "styled-components";
import { ReactComponent } from "./storage.svg";

const StorageIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default StorageIcon;
