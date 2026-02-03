import styled from "styled-components";
import Analytics from "../components/home/analytics";
import Overview from "../components/home/overview";
import Sections from "../components/home/sections";
import VolaStorageStats from "../components/home/vola-storage-stats";
import HomeLayout from "../components/layout/home";
import { m_t } from "../styles/tailwindcss";

const OverviewWrapper = styled.div`
  animation: fadeInSlideUp 0.6s ease-out;

  @keyframes fadeInSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AnalyticsWrapper = styled.div`
  animation: fadeInSlideUp 0.6s ease-out 0.2s backwards;

  @keyframes fadeInSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const VolaStatsWrapper = styled.div`
  animation: fadeInSlideUp 0.6s ease-out 0.4s backwards;

  @keyframes fadeInSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionsWrapper = styled.div`
  ${m_t(16)};
  animation: fadeInSlideUp 0.6s ease-out 0.6s backwards;

  @keyframes fadeInSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function Home() {
  return (
    <HomeLayout>
      {/* <Explore /> */}

      <OverviewWrapper>
        <Overview />
      </OverviewWrapper>

      <AnalyticsWrapper>
        <Analytics />
      </AnalyticsWrapper>

      <VolaStatsWrapper>
        <VolaStorageStats />
      </VolaStatsWrapper>

      <SectionsWrapper>
        <Sections />
      </SectionsWrapper>
    </HomeLayout>
  );
}

export default Home;
