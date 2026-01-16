import { useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "styled-components";
import "../../charts/config";
import useChartGradient from "../../../hooks/overview/useChartGradient";
import useExtrinsicChartData from "../../../hooks/overview/useFileVolumeChartData";
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
import humanReadableStorage from "../../../utils/humanReadableStorage";

function TotalVolumeChart() {
  const [timeRange, setTimeRange] = useState(CHART_TIME_RANGE.ONE_WEEK);
  const chartRef = useRef(null);
  const theme = useTheme();

  const { start, interval } = useTimeRangeParams(timeRange);
  const { chartData, loading } = useExtrinsicChartData(start, interval);
  const gradient = useChartGradient(chartRef, chartData);
  const Yaxis = useMemo(() => {
    return {
      beginAtZero: false,
      grid: {
        display: true,
        color: theme.fontTertiary,
      },
      border: {
        display: false,
        dash: [3, 3],
      },
      ticks: {
        callback(value) {
          return humanReadableStorage(value);
        },
      },
    };
  }, [theme]);
  const { data, options } = useMemo(() => {
    const data = createChartDataset(
      chartData,
      "fileVolume",
      "Total File Volume",
      gradient,
      0.25,
    );
    const options = data
      ? {
          ...createChartOptions(
            theme,
            "Total Storage Volume",
            timeRange,
            Yaxis,
          ),
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
  }, [Yaxis, chartData, gradient, theme, timeRange]);

  return (
    <Section>
      <StyledPanel>
        <Header>
          <div>
            <Label size="14">Total Storage Volume</Label>

            <Label size="12" muted>
              Total Storage Volume (cumulative) over The Last{" "}
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

export default TotalVolumeChart;
