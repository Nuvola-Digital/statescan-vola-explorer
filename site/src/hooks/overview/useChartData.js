import { useCallback, useEffect } from "react";
import { createGlobalState, useEffectOnce, useInterval } from "react-use";
import api from "../../services/api";
import { chartDataApi } from "../../services/urls";

const useGlobalData = createGlobalState({});
const useGlobalLoading = createGlobalState(true);
const useGlobalFetching = createGlobalState(false);

export default function useChartData(start, end, interval) {
  const [chartData, setChartData] = useGlobalData();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalFetching();

  const fetchChartData = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    // Build query params if parameters are provided
    let url = chartDataApi;
    if (start !== undefined && end !== undefined && interval !== undefined) {
      const params = new URLSearchParams({
        start: start.toString(),
        end: end.toString(),
        interval: interval.toString(),
      });
      url = `${chartDataApi}?${params.toString()}`;
    }

    api
      .fetch(url)
      .then((resp) => {
        setChartData(resp.result || {});
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [
    isFetching,
    setChartData,
    setIsFetching,
    setLoading,
    start,
    end,
    interval,
  ]);

  useEffectOnce(fetchChartData);

  useEffect(() => {
    // Refetch when parameters change
    if (start !== undefined && end !== undefined && interval !== undefined) {
      setLoading(true);
      fetchChartData();
    }
  }, [start, end, interval]);

  useInterval(() => {
    fetchChartData();
  }, 12000);

  return { chartData, loading };
}
