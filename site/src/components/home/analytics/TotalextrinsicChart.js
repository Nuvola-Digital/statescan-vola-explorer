import { useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "styled-components";
import "../../../components/charts/config";
import useChartGradient from "../../../hooks/overview/useChartGradient";
import useExtrinsicChartData from "../../../hooks/overview/useExtrinsicChartData";
import useTimeRangeParams from "../../../hooks/overview/useTimeRangeParams";
import {
  createChartDataset,
  createChartOptions,
} from "../../../utils/chartHelpers";
import {
  CHART_TIME_RANGE,
  CHART_TIME_RANGE_ITEMS,
} from "../../../utils/constants";
import Loading from "../../loadings/loading";
import { Section, StyledPanel } from "../sections/styled";
import { Label } from "../vola-storage-stats/styled";
import { ChartWrapper, Header, NoData, TabButton, TabsList } from "./styled";

function TotalExtrinsicsChart() {
  const [timeRange, setTimeRange] = useState(CHART_TIME_RANGE.ONE_WEEK);
  const chartRef = useRef(null);
  const theme = useTheme();

  const { start, interval } = useTimeRangeParams(timeRange);
  const { chartData, loading } = useExtrinsicChartData(start, interval);
  const gradient = useChartGradient(chartRef, chartData);

  const { data, options } = useMemo(() => {
    const data = createChartDataset(
      chartData,
      "totalExtrinsics",
      "Total Extrinsics",
      gradient,
    );
    const options = data
      ? {
          ...createChartOptions(theme, "Total Extrinsics"),
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
  }, [chartData, gradient, theme]);

  return (
    <Section>
      <StyledPanel>
        <Header>
          <div>
            <Label size="14">Transaction Status</Label>

            <Label size="12" muted>
              Total number of events over the last{" "}
              {timeRange === CHART_TIME_RANGE.ONE_DAY
                ? "24 hours"
                : timeRange === CHART_TIME_RANGE.ONE_WEEK
                ? "7 days"
                : "30 days"}
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

export default TotalExtrinsicsChart;
