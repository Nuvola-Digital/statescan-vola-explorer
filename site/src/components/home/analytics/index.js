import { StyledPanelTableWrapper } from "../../styled/panel";
import { SectionsWrapper, Title } from "../sections/styled";
import TotalEventsChart from "./TotalEventsChart";
import TotalExtrinsicsChart from "./TotalextrinsicChart";

function Analytics() {
  return (
    <StyledPanelTableWrapper>
      <Title>Analytics</Title>
      <SectionsWrapper>
        <TotalExtrinsicsChart />
        <TotalEventsChart />
        {/* <Transfers /> */}
      </SectionsWrapper>
    </StyledPanelTableWrapper>
  );
}
export default Analytics;
