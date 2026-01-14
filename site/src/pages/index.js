import styled from "styled-components";
import Explore from "../components/home/explore";
import Overview from "../components/home/overview";
import Sections from "../components/home/sections";
import VolaStorageStats from "../components/home/vola-storage-stats";
import HomeLayout from "../components/layout/home";
import { m_t } from "../styles/tailwindcss";
import Analytics from "../components/home/analytics";

const SectionsWrapper = styled.div`
  ${m_t(16)};
`;

const OverviewWrapper = styled.div``;

function Home() {
  return (
    <HomeLayout>
      <Explore />

      <OverviewWrapper>
        <Overview />
      </OverviewWrapper>

      <Analytics />
      <VolaStorageStats />
      <SectionsWrapper>
        <Sections />
      </SectionsWrapper>
    </HomeLayout>
  );
}

export default Home;
