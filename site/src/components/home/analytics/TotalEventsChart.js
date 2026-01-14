import { useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "styled-components";
import "../../../components/charts/config";
import useEventAndVolumeChartData from "../../../hooks/overview/useEventAndVolumeChartData";
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

  const { start, end, interval } = useTimeRangeParams(timeRange);
  const { eventData, volumeData, loading } = useEventAndVolumeChartData(
    start,
    end,
    interval,
  );

  const { data, options } = useMemo(() => {
    const parsedVolumeData = volumeData.map((item) => ({
      interval: item.interval_start,
      file_volume: item.file_volume,
    }));
    const data = createDualAxisDataset(
      eventData,
      parsedVolumeData,
      "totalEvents",
      "file_volume",
      "Total Events",
      "Total Volume",
      "#06B6D4",
      "#10B981",
    );
    const options = data
      ? {
          ...createDualAxisChartOptions(theme, "#10B981"),
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
  }, [eventData, volumeData, theme]);

  return (
    <Section>
      <StyledPanel>
        <Header>
          <div>
            <Label size="14">Events & Volume</Label>
            <Label size="12" muted>
              Total events and volume over the last{" "}
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

export default TotalEventsChart;
