import styled from "styled-components";
import LayoutOrigin from ".";
import { space_y } from "../../styles/tailwindcss";

const Layout = styled(LayoutOrigin)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  main {
    margin-top: 80px;
     ${space_y(80)};
  }
`;

export default function HomeLayout(props) {
  return <Layout {...props} />;
}
