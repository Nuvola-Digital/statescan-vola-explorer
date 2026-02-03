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
        start = moment().subtract(7, "days").startOf("day").valueOf();
        interval = 4 * 60 * 60 * 1000; // ~4 hours in milliseconds
        break;
      case CHART_TIME_RANGE.ONE_MONTH:
        // Start from 30 days ago at 00:00
        start = moment().subtract(30, "days").startOf("day").valueOf();
        interval = 1 * 24 * 60 * 60 * 1000; // 1 day in milliseconds
        break;
      default:
        start = moment().startOf("day").valueOf();
        interval = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
    }

    return { start, interval };
  }, [timeRange]);
}
