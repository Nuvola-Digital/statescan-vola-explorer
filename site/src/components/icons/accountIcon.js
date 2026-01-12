import styled from "styled-components";
import { ReactComponent as Account } from "./account.svg";

const AccountIcon = styled(Account)`
  path {
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

export default AccountIcon;
