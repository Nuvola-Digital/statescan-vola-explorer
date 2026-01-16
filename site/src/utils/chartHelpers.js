import moment from "moment";
import humanReadableStorage from "./humanReadableStorage";
import { CHART_TIME_RANGE } from "./constants";

export function createDualAxisChartOptions(
  theme,
  y2color = "#F472B6",
  timeRange,
) {
  // Determine display format based on time range
  let displayFormat;
  let timeUnit;

  switch (timeRange) {
    case CHART_TIME_RANGE.ONE_DAY:
      displayFormat = "HH:mm";
      timeUnit = "hour";
      break;
    case CHART_TIME_RANGE.ONE_WEEK:
      displayFormat = "ddd"; // Shows day name and time like "Mon 12:00"
      timeUnit = "hour";
      break;
    case CHART_TIME_RANGE.ONE_MONTH:
      displayFormat = "MMM DD";
      timeUnit = "day";
      break;
    default:
      displayFormat = "HH:mm";
      timeUnit = "hour";
  }

  return {
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
          unit: timeUnit,
          displayFormats: {
            hour: displayFormat,
            day: displayFormat,
          },
          tooltipFormat: "MMM DD, YYYY HH:mm",
        },
        grid: {
          display: true,
          color: theme.fontTertiary,
        },
        border: {
          display: false,
          dash: [3, 3],
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        type: "linear",
        display: true,
        position: "left",
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
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + "K";
            }
            return value;
          },
          maxTicksLimit: 6,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
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
          maxTicksLimit: 6,

          color: y2color,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            size: 8,
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          title: (context) => {
            return moment(context[0].parsed.x).format("MMM DD, YYYY HH:mm");
          },
          label: (context) => {
            const label = context.dataset.label;
            const value = context.parsed.y;
            // Check if this dataset uses y1 axis (secondary axis)
            if (context.dataset.yAxisID === "y1") {
              return `${label}: ${value.toLocaleString()}`;
            }
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
  };
}

export function createChartOptions(theme, dataLabel, timeRange, yAxis) {
  // Determine display format based on time range
  let displayFormat;
  let timeUnit;

  switch (timeRange) {
    case CHART_TIME_RANGE.ONE_DAY:
      displayFormat = "HH:mm";
      timeUnit = "hour";
      break;
    case CHART_TIME_RANGE.ONE_WEEK:
      displayFormat = "ddd"; // Shows day name and time like "Mon 12:00"
      timeUnit = "hour";
      break;
    case CHART_TIME_RANGE.ONE_MONTH:
      displayFormat = "MMM DD";
      timeUnit = "day";
      break;
    default:
      displayFormat = "HH:mm";
      timeUnit = "hour";
  }

  return {
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
          unit: timeUnit,
          displayFormats: {
            hour: displayFormat,
            day: displayFormat,
          },
          tooltipFormat: "MMM DD, YYYY HH:mm",
        },
        grid: {
          display: true,
          color: theme.fontTertiary,
        },
        border: {
          display: false,
          dash: [3, 3],
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: yAxis,
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
            return `${dataLabel}: ${humanReadableStorage(context.parsed.y)}`;
          },
        },
      },
    },
  };
}

export function createChartDataset(
  chartData,
  dataKey,
  label,
  gradient,
  tension = 0,
  pointRadius = 0,
  borderColor = "#06B6D4",
) {
  if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
    return null;
  }

  const labels = chartData.map((item) => item.interval);
  const data = chartData.map((item) => item[dataKey]);

  return {
    labels,
    datasets: [
      {
        label,
        data,
        fill: true,
        backgroundColor: gradient ?? "transparent",
        borderColor: borderColor,
        borderWidth: 0.5,
        tension: tension,
        pointRadius: pointRadius,
        pointBackgroundColor: borderColor,
        pointHoverRadius: 3,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
      },
    ],
  };
}

export function createDualAxisDataset(
  chartData1,
  chartData2,
  dataKey1,
  dataKey2,
  label1,
  label2,
  color1 = "#06B6D4",
  color2 = "#F472B6",
  gradient1 = null,
  gradient2 = null,
) {
  if (
    (!chartData1 || !Array.isArray(chartData1) || chartData1.length === 0) &&
    (!chartData2 || !Array.isArray(chartData2) || chartData2.length === 0)
  ) {
    return null;
  }

  const labels = (chartData1 || chartData2).map((item) => item.interval);
  const data1 = chartData1 ? chartData1.map((item) => item[dataKey1]) : [];
  const data2 = chartData2 ? chartData2.map((item) => item[dataKey2]) : [];

  return {
    labels,
    datasets: [
      {
        label: label1,
        data: data1,
        fill: !!gradient1,
        backgroundColor: gradient1 ?? "transparent",
        borderColor: color1,
        borderWidth: 0.5,
        tension: 0.25,
        pointRadius: 0,
        pointBackgroundColor: color1,
        pointHoverRadius: 3,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        yAxisID: "y",
      },
      {
        label: label2,
        data: data2,
        fill: !!gradient2,
        backgroundColor: gradient2 ?? "transparent",
        borderColor: color2,
        borderWidth: 0.5,
        tension: 0.25,
        pointRadius: 0,
        pointBackgroundColor: color2,
        pointHoverRadius: 3,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        yAxisID: "y1",
      },
    ],
  };
}
