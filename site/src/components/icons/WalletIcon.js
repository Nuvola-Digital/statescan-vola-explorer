import styled from "styled-components";
import { ReactComponent as Wallet } from "./wallet.svg";
const WalletIcon = styled(Wallet)`
  path {
    stroke: none;
    fill: ${({ theme }) => theme.fontPrimary};
  }
`;

export default WalletIcon;
