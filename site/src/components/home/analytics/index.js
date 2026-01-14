import { StyledPanelTableWrapper } from "../../styled/panel";
import { SectionsWrapper } from "../sections/styled";
import TotalEventsChart from "./TotalEventsChart";
import TotalExtrinsicsChart from "./TotalextrinsicChart";

function Analytics() {
  return (
    <StyledPanelTableWrapper>
      <SectionsWrapper>
        <TotalExtrinsicsChart />
        <TotalEventsChart />
        {/* <Transfers /> */}
      </SectionsWrapper>
    </StyledPanelTableWrapper>
  );
}
export default Analytics;
