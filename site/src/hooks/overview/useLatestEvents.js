import { useCallback } from "react";
import { createGlobalState, useEffectOnce, useInterval } from "react-use";
import api from "../../services/api";
import { eventListApi } from "../../services/urls";
import useIsRelayChain from "../../utils/hooks/chain/useIsRelayChain";

const useGlobalEvents = createGlobalState([]);
const useGlobalLoading = createGlobalState(true);
const useGlobalIsFetching = createGlobalState(false);

export default function useLatestEvents() {
  const [events, setEvents] = useGlobalEvents();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalIsFetching();

  const isRelay = useIsRelayChain();

  const fetchEvents = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);
    api
      .fetch(eventListApi, { page: 1, pageSize: 5 })
      .then((resp) => {
        console.log({ resp });
        setEvents(resp.result.items || []);
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching, setEvents, setLoading, setIsFetching]);

  useEffectOnce(fetchEvents);

  useInterval(
    () => {
      fetchEvents();
    },
    isRelay ? 6000 : 12000,
  );

  return { events, loading };
}
