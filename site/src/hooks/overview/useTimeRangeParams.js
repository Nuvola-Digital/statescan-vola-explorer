import moment from "moment";
import { useMemo } from "react";
import { CHART_TIME_RANGE } from "../../utils/constants";

export default function useTimeRangeParams(timeRange) {
  return useMemo(() => {
    const now = Date.now();
    let start, interval;

    switch (timeRange) {
      case CHART_TIME_RANGE.ONE_DAY:
        // Start from 00:00 today
        start = moment().startOf("day").valueOf();
        interval = 3600000; // 1 hour in milliseconds
        break;
      case CHART_TIME_RANGE.ONE_WEEK:
        // Start from 7 days ago
        start = moment().subtract(7, "days").valueOf();
        interval = 21600000; // 6 hours in milliseconds
        break;
      case CHART_TIME_RANGE.ONE_MONTH:
        // Start from 30 days ago
        start = moment().subtract(30, "days").valueOf();
        interval = 86400000; // 1 day in milliseconds
        break;
      default:
        start = moment().startOf("day").valueOf();
        interval = 3600000;
    }

    return { start, end: now, interval };
  }, [timeRange]);
}
