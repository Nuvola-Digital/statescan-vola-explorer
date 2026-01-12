import styled from "styled-components";
import { ReactComponent } from "./db-storage.svg";

const DbStorageIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default DbStorageIcon;
