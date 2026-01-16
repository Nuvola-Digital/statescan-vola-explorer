import { useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "styled-components";
import "../../../components/charts/config";
import useChartGradient from "../../../hooks/overview/useChartGradient";
import useEventAndTransactionData from "../../../hooks/overview/useEventAndTransactionData";
import useTimeRangeParams from "../../../hooks/overview/useTimeRangeParams";
import {
  createDualAxisChartOptions,
  createDualAxisDataset,
} from "../../../utils/chartHelpers";
import {
  CHART_TIME_RANGE,
  CHART_TIME_RANGE_ITEMS,
} from "../../../utils/constants";
import Loading from "../../loadings/loading";
import { Section, StyledPanel } from "../sections/styled";
import { Label } from "../vola-storage-stats/styled";
import { ChartWrapper, Header, NoData, TabButton, TabsList } from "./styled";

function TotalEventsChart() {
  const [timeRange, setTimeRange] = useState(CHART_TIME_RANGE.ONE_WEEK);
  const chartRef = useRef(null);
  const theme = useTheme();
  const { start, interval } = useTimeRangeParams(timeRange);

  const { eventData, transactionData, loading } = useEventAndTransactionData(
    start,
    interval,
  );
  const gradient1 = useChartGradient(chartRef, eventData);
  const gradient2 = useChartGradient(chartRef, transactionData, "#10B981");

  const { data, options } = useMemo(() => {
    const parsedVolumeData = transactionData;
    const data = createDualAxisDataset(
      eventData,
      parsedVolumeData,
      "totalEvents",
      "totalExtrinsics",
      "Total Events",
      "Total Transactions",
      "#06B6D4",
      "#10B981",
      gradient1,
      gradient2,
    );
    const options = data
      ? {
          ...createDualAxisChartOptions(theme, "#10B981", timeRange),
          animation: {
            duration: 750,
            easing: "easeInOutQuart",
          },
          transitions: {
            active: {
              animation: {
                duration: 400,
              },
            },
          },
        }
      : null;
    return { data, options };
  }, [transactionData, eventData, gradient1, gradient2, theme, timeRange]);

  return (
    <Section>
      <StyledPanel>
        <Header>
          <div>
            <Label size="14">Transaction & Events</Label>
            <Label size="12" muted>
              Total Number of Events & Transactions (Cumulative) over the last{" "}
              {timeRange === CHART_TIME_RANGE.ONE_DAY
                ? "24 Hours"
                : timeRange === CHART_TIME_RANGE.ONE_WEEK
                ? "7 Days"
                : "30 Days"}
            </Label>
          </div>
          <TabsList>
            {CHART_TIME_RANGE_ITEMS.map((item) => (
              <TabButton
                key={item}
                active={timeRange === item}
                onClick={() => setTimeRange(item)}
              >
                {item}
              </TabButton>
            ))}
          </TabsList>
        </Header>
        <ChartWrapper>
          {loading ? (
            <NoData>
              <Loading />
            </NoData>
          ) : data ? (
            <Line ref={chartRef} data={data} options={options} />
          ) : (
            <NoData>No data available</NoData>
          )}
        </ChartWrapper>
      </StyledPanel>
    </Section>
  );
}

export default TotalEventsChart;
