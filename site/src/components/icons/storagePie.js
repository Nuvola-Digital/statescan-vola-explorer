import styled from "styled-components";
import { ReactComponent } from "./storage.svg";

const StoragePieIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default StoragePieIcon;
