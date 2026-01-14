import { useCallback, useEffect } from "react";
import { createGlobalState, useEffectOnce, useInterval } from "react-use";
import api from "../../services/api";
import { extrinsicChartApi } from "../../services/urls";

const useGlobalData = createGlobalState({});
const useGlobalLoading = createGlobalState(true);
const useGlobalFetching = createGlobalState(false);
const useGlobalInitialized = createGlobalState(false);

export default function useExtrinsicChartData(start, end, interval) {
  const [chartData, setChartData] = useGlobalData();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalFetching();
  const [initialized, setInitialized] = useGlobalInitialized();

  const fetchChartData = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    // Build query params if parameters are provided
    let url = extrinsicChartApi;
    if (start !== undefined && end !== undefined && interval !== undefined) {
      const params = new URLSearchParams({
        start: start.toString(),
        end: end.toString(),
        interval: interval.toString(),
      });
      url = `${extrinsicChartApi}?${params.toString()}`;
    }

    api
      .fetch(url)
      .then((resp) => {
        setChartData(resp.result || {});
        setLoading(false);
        setInitialized(true);
      })
      .finally(() => {
        setIsFetching(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // Only show loading on initial load, not on subsequent fetches
      if (!initialized) {
        setLoading(true);
      }
      fetchChartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, interval]);

  useInterval(() => {
    fetchChartData();
  }, 12000);

  return { chartData, loading };
}
