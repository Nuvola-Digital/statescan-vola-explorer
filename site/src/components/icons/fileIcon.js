import styled from "styled-components";
import { ReactComponent } from "./file.svg";

const FileIcon = styled(ReactComponent)`
  path {
    stroke: ${({ theme }) => theme.fontTertiary};
  }
`;

export default FileIcon;
