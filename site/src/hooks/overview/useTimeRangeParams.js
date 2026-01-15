import moment from "moment";
import { useMemo } from "react";
import { CHART_TIME_RANGE } from "../../utils/constants";

export default function useTimeRangeParams(timeRange) {
  return useMemo(() => {
    let start, interval;

    switch (timeRange) {
      case CHART_TIME_RANGE.ONE_DAY:
        // Start from 00:00 today
        start = moment().startOf("day").valueOf();
        interval = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
        break;
      case CHART_TIME_RANGE.ONE_WEEK:
        // Start from 7 days ago
        start = moment().subtract(6, "days").valueOf() - 60000;
        interval = 1 * 24 * 60 * 60 * 1000; // ~1 days in milliseconds
        break;
      case CHART_TIME_RANGE.ONE_MONTH:
        // Start from 30 days ago
        start = moment().subtract(29, "days").valueOf() - 60000;
        interval = 1 * 24 * 60 * 60 * 1000; // 1 day in milliseconds
        break;
      default:
        start = moment().startOf("day").valueOf();
        interval = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
    }

    return { start, interval };
  }, [timeRange]);
}
