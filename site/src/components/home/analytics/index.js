import { StyledPanelTableWrapper } from "../../styled/panel";
import { SectionsWrapper, Title } from "../sections/styled";
import TotalEventsChart from "./TotalEventsChart";
import TotalExtrinsicsChart from "./TotalextrinsicChart";

function Analytics() {
  return (
    <StyledPanelTableWrapper>
      <Title>Total Events</Title>
      <SectionsWrapper>
        <TotalExtrinsicsChart />
        <TotalEventsChart />
        {/* <Transfers /> */}
      </SectionsWrapper>
    </StyledPanelTableWrapper>
  );
}
export default Analytics;
