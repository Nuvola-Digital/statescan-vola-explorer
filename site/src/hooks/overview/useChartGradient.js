import { useEffect, useState } from "react";

export default function useChartGradient(chartRef, chartData) {
  const [gradient, setGradient] = useState(null);

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
  }, [chartData, chartRef]);

  return gradient;
}
