import styled from "styled-components";
import { ReactComponent as VolaNameIcon } from "./vola-name.svg";

const StyledVolaNameIcon = styled(VolaNameIcon)`
  .cls-4 {
    fill: ${(props) => props.theme.fontPrimary};
  }
`;

export default function VolaNameLogo(props) {
  return <StyledVolaNameIcon {...props} />;
}
