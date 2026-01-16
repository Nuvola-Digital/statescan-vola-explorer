import { StyledPanelTableWrapper } from "../../styled/panel";
import { SectionsWrapper, Title } from "../sections/styled";
import TotalEventsChart from "./TotalEventsChart";
import TotalExtrinsicsChart from "./TotalVolumeChart";

function Analytics() {
  return (
    <StyledPanelTableWrapper>
      <Title>Analytics</Title>
      <SectionsWrapper>
        <TotalEventsChart />
        <TotalExtrinsicsChart />
        {/* <Transfers /> */}
      </SectionsWrapper>
    </StyledPanelTableWrapper>
  );
}
export default Analytics;
