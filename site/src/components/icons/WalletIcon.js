import styled from 'styled-components';
import { ReactComponent as Wallet } from "./wallet.svg";
const WalletIcon = styled(Wallet)`
  path {
    stroke: ${(p) => p.theme.fontTertiary};
  }
`;

export default WalletIcon