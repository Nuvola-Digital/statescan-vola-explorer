const {
  queryFinalizedBlocks,
} = require("../../../common/queryFinalizedBlocks");
const {
  queryUnFinalizedBlocks,
} = require("../../../common/queryUnFinalizedBlocks");
const { extractPage, extractDateRange } = require("../../../utils");
const {
  block: { getBlockCollection },
} = require("@statescan/mongo");

function getBoundariesByInterval(startTs, endTs, interval) {
  if (endTs - startTs < interval)
    throw new Error(
      "Invalid interval, interval should be smaller than difference between start and end",
    );
  const intervals = [];
  let current = startTs;
  const end = endTs + interval; //since upper bound is exclusive, we need to add an interval to the end date

  while (current <= end) {
    intervals.push(current);
    current = current + interval; // Move to the next interval
  }
  return intervals;
}

async function getChart(ctx) {
  const { start, end, interval } = extractDateRange(ctx);
  const col = await getBlockCollection();
  const totalBeforeStart = await col
    .aggregate([
      {
        $match: {
          time: {
            $lt: start,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalEventsCount: {
            $sum: "$eventsCount",
          },
          totalExtrinsicsCount: {
            $sum: "$extrinsicsCount",
          },
        },
      },
    ])
    .toArray();

  let totalEvents = totalBeforeStart[0]?.totalEventsCount;
  let totalExtrinsics = totalBeforeStart[0]?.totalExtrinsicsCount;
  const intervals = getBoundariesByInterval(start, end, interval);

  const distributions = await col
    .aggregate([
      {
        $match: {
          time: {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $bucket: {
          groupBy: "$time",
          boundaries: intervals,
          default: null,
          output: {
            totalEvents: {
              $sum: "$eventsCount",
            },
            totalExtrinsics: {
              $sum: "$extrinsicsCount",
            },
          },
        },
      },
      {
        $project: {
          interval: "$_id",
          _id: 0,
          totalEvents: 1,
          totalExtrinsics: 1,
        },
      },
    ])
    .toArray();

  const distributionMap = new Map(
    distributions.map((x) => [
      x.interval,
      {
        totalEvents: x.totalEvents,
        totalExtrinsics: x.totalExtrinsics,
      },
    ]),
  );

  const chart = intervals
    .filter((x) => x <= end)
    .map((interval) => {
      const totalEventsInInterval =
        distributionMap.get(interval)?.totalEvents || 0;
      const totalExtrinsicsInInterval =
        distributionMap.get(interval)?.totalExtrinsics || 0;
      totalEvents += totalEventsInInterval;
      totalExtrinsics += totalExtrinsicsInInterval;
      return {
        interval,
        totalEvents,
        totalExtrinsics,
      };
    });
  ctx.body = chart;
}

async function getBlocks(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  let items = await queryFinalizedBlocks(page, pageSize);
  const col = await getBlockCollection();
  let total = await col.estimatedDocumentCount();
  if (page <= 0) {
    const unFinalizedItems = await queryUnFinalizedBlocks();
    items = [...unFinalizedItems, ...items];
    total += unFinalizedItems.length;
  }

  ctx.body = {
    items,
    page,
    pageSize,
    total: total,
  };
}

module.exports = {
  getBlocks,
  getChart,
};
