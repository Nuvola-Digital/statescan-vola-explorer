import { useCallback, useEffect } from "react";
import { createGlobalState, useEffectOnce, useInterval } from "react-use";
import api from "../../services/api";
import { eventChartApi, volumeChartApi } from "../../services/urls";

const useGlobalEventData = createGlobalState([]);
const useGlobalVolumeData = createGlobalState([]);
const useGlobalLoading = createGlobalState(true);
const useGlobalFetching = createGlobalState(false);
const useGlobalInitialized = createGlobalState(false);

export default function useEventAndVolumeChartData(start, interval) {
  const [eventData, setEventData] = useGlobalEventData();
  const [volumeData, setVolumeData] = useGlobalVolumeData();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalFetching();
  const [initialized, setInitialized] = useGlobalInitialized();

  const fetchChartData = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    // Build query params if parameters are provided
    const params =
      start !== undefined && interval !== undefined
        ? `?${new URLSearchParams({
            start: start.toString(),
            interval: interval.toString(),
          }).toString()}`
        : "";

    const eventUrl = `${eventChartApi}${params}`;
    const volumeUrl = `${volumeChartApi}${params}`;

    // Fetch both in parallel
    Promise.all([api.fetch(eventUrl), api.fetch(volumeUrl)])
      .then(([eventResp, volumeResp]) => {
        setEventData(eventResp.result || []);
        setVolumeData(volumeResp.result || []);
        setLoading(false);
        setInitialized(true);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, start, interval]);

  useEffectOnce(fetchChartData);

  useEffect(() => {
    // Refetch when parameters change
    if (start !== undefined && interval !== undefined) {
      // Only show loading on initial load, not on subsequent fetches
      if (!initialized) {
        setLoading(true);
      }
      fetchChartData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, interval]);

  useInterval(() => {
    fetchChartData();
  }, 1200000);

  return { eventData, volumeData, loading };
}
