import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import styled, { useTheme } from "styled-components";
import "../../../components/charts/config";
import useChartData from "../../../hooks/overview/useChartData";
import {
  CHART_TIME_RANGE,
  CHART_TIME_RANGE_ITEMS,
} from "../../../utils/constants";
import Loading from "../../loadings/loading";
import { FlexBetween } from "../../styled/flex";
import { Section, StyledPanel, Title } from "../sections/styled";
import { Label } from "../vola-storage-stats/styled";

const ChartWrapper = styled.div`
  height: 300px;
  padding: 16px;
  flex: 1;
`;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${(p) => p.theme.fontSecondary};
`;

const Header = styled(FlexBetween)`
  padding: 14px 16px;
  border-bottom: 1px solid ${(p) => p.theme.strokeBase};
`;

const TabsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0px;
  background-color: ${(p) => p.theme.surfaceContainerHigh};
  padding: 4px;
  border-radius: 12px;
`;

const TabButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: transparent;
  color: ${(p) => p.theme.fontTertiary};
  text-transform: uppercase;

  &:hover {
    background-color: ${(p) => p.theme.secondaryContainer};
    color: ${(p) => p.theme.fontSecondary};
  }

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.theme500};
    outline-offset: 2px;
  }

  ${(p) =>
    p.active &&
    `
    background-color: ${p.theme.secondaryContainerHover || "#ffffff"};
    color: ${p.theme.fontPrimary};
    
    &:hover {
      background-color: ${p.theme.secondaryContainerHover || "#ffffff"};
      color: ${p.theme.fontPrimary};
    }
  `}
`;

function TotalEventsChart() {
  const [timeRange, setTimeRange] = useState(CHART_TIME_RANGE.ONE_DAY);
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);
  const theme = useTheme();

  // Calculate start, end, and interval based on timeRange
  const { start, end, interval } = useMemo(() => {
    const now = Date.now();
    let start, interval;

    switch (timeRange) {
      case CHART_TIME_RANGE.ONE_DAY:
        // Start from 00:00 today
        start = moment().startOf("day").valueOf();
        interval = 3600000; // 1 hour in milliseconds
        break;
      case CHART_TIME_RANGE.ONE_WEEK:
        // Start from 7 days ago
        start = moment().subtract(7, "days").valueOf();
        interval = 21600000; // 6 hours in milliseconds
        break;
      case CHART_TIME_RANGE.ONE_MONTH:
        // Start from 30 days ago
        start = moment().subtract(30, "days").valueOf();
        interval = 86400000; // 1 day in milliseconds
        break;
      default:
        start = moment().startOf("day").valueOf();
        interval = 3600000;
    }

    return { start, end: now, interval };
  }, [timeRange]);

  const { chartData, loading } = useChartData(start, end, interval);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;

      if (chartArea) {
        const gradientFill = ctx.createLinearGradient(
          0,
          chartArea.top,
          0,
          chartArea.bottom,
        );
        gradientFill.addColorStop(0, "rgba(6, 182, 212, 0.60)");
        gradientFill.addColorStop(1, "rgba(0, 25, 31, 0.00)");
        setGradient(gradientFill);
      }
    }
  }, [chartData]);

  const { data, options } = useMemo(() => {
    if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
      return { data: null, options: null };
    }

    const labels = chartData.map((item) => item.interval);
    const totalEvents = chartData.map((item) => item.totalEvents);

    const data = {
      labels,
      datasets: [
        {
          label: "Total Events",
          data: totalEvents,
          fill: true,
          backgroundColor: gradient || "rgba(6, 182, 212, 0.3)",
          borderColor: "#06B6D4",
          borderWidth: 2,
          tension: 0,
          pointRadius: 3,
          pointBackgroundColor: "#06B6D4",
          pointHoverRadius: 5,
          pointHoverBorderWidth: 2,
          pointHitRadius: 10,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {
              hour: "HH:mm",
              day: "MMM DD",
            },
            tooltipFormat: "MMM DD, YYYY HH:mm",
          },
          grid: {
            display: true,
            color: theme.fontTertiary,
          },
          border: {
            display: false,
            dash: [6, 6],
          },
          ticks: {
            maxTicksLimit: 6,
          },
        },
        y: {
          beginAtZero: false,
          grid: {
            display: true,
            color: theme.fontTertiary,
          },
          border: {
            display: false,
            dash: [6, 6],
          },
          ticks: {
            callback(value) {
              if (value >= 1000000) {
                return (value / 1000000).toFixed(1) + "M";
              } else if (value >= 1000) {
                return (value / 1000).toFixed(1) + "K";
              }
              return value;
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            title: (context) => {
              return moment(context[0].parsed.x).format("MMM DD, YYYY HH:mm");
            },
            label: (context) => {
              return `Total Events: ${context.parsed.y.toLocaleString()}`;
            },
          },
        },
      },
    };

    return { data, options };
  }, [chartData, gradient, theme]);

  return (
    <Section>
      <Title>Total Events</Title>
      <StyledPanel>
        <Header>
          <div>
            <Label size="14">Transaction Status</Label>

            <Label size="12" muted>
              Transactions over the last 24 hours
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
