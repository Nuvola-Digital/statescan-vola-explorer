import { useCallback } from "react";
import { createGlobalState, useEffectOnce, useInterval } from "react-use";
import { statsApi } from "../../services/urls";

const useGlobalData = createGlobalState({});
const useGlobalLoading = createGlobalState(true);
const useGlobalFetching = createGlobalState(false);

export default function useVolaStats() {
  const [volaStats, setVolaStats] = useGlobalData();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalFetching();

  const fetchVolaStats = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    fetch(statsApi)
      .then((response) => response.json())
      .then((data) => {
        setVolaStats(data || {});
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching, setVolaStats, setIsFetching, setLoading]);

  useEffectOnce(fetchVolaStats);

  useInterval(() => {
    fetchVolaStats();
  }, 12000);

  return { volaStats, loading };
}
