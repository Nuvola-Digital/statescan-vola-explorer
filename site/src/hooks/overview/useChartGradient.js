import { useEffect, useState } from "react";

export default function useChartGradient(
  chartRef,
  chartData,
  startColor = "rgba(6, 182, 212, 0.60)",
) {
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
        gradientFill.addColorStop(0, startColor);
        gradientFill.addColorStop(1, "rgba(0, 25, 31, 0.00)");
        setGradient(gradientFill);
      }
    }
  }, [chartData, chartRef, startColor]);

  return gradient;
}
