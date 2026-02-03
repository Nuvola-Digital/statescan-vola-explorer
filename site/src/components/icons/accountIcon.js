import styled from "styled-components";
import { ReactComponent as Account } from "./account.svg";

const AccountIcon = styled(Account)`
  path {
    stroke: none;
    fill: ${({ theme }) => theme.fontPrimary};
  }
`;

export default AccountIcon;
