import { StyledPanelTableWrapper } from "../../styled/panel";
import Events from "../sections/blockAndTransfers/events";
import { SectionsWrapper } from "../sections/styled";
import TotalEventsChart from "./TotalEventsChart";

function Analytics() {
  return (
    <StyledPanelTableWrapper>
      <SectionsWrapper>
        <TotalEventsChart />
        {/* <Transfers /> */}
        <Events />
      </SectionsWrapper>
    </StyledPanelTableWrapper>
  );
}
export default Analytics;
