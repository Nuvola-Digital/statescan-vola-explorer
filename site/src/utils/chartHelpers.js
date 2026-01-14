import moment from "moment";

export function createDualAxisChartOptions(theme, y2color = "#F472B6") {
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
        beginAtZero: true,
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
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        beginAtZero: true,
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
            return `${
              context.dataset.label
            }: ${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
  };
}

export function createChartOptions(theme, dataLabel) {
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
          dash: [3, 3],
        },
        ticks: {
          maxTicksLimit: 6,
        },
      },
      y: {
        beginAtZero: true,
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
            return `${dataLabel}: ${context.parsed.y.toLocaleString()}`;
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
  tension = 0.4,
  pointRadius = 0,
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
        borderColor: "#06B6D4",
        borderWidth: 2,
        tension: tension,
        pointRadius: pointRadius,
        pointBackgroundColor: "#06B6D4",
        pointHoverRadius: 5,
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
        fill: false,
        backgroundColor: color1,
        borderColor: color1,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: color1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        yAxisID: "y",
      },
      {
        label: label2,
        data: data2,
        fill: false,
        backgroundColor: color2,
        borderColor: color2,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: color2,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointHitRadius: 10,
        yAxisID: "y1",
      },
    ],
  };
}
