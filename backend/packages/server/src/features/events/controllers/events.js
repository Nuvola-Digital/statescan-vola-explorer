const { getTimeDimension } = require("../../../common/getTimeDimension");
const {
  extractPage,
  extractDateRange,
  getBoundariesByInterval,
} = require("../../../utils");
const {
  block: { getEventCollection },
} = require("@statescan/mongo");

async function getChart(ctx) {
  const col = await getEventCollection();
  const { start, end, interval } = extractDateRange(ctx);
  const intervals = getBoundariesByInterval(start, end, interval);
  const totalBeforeStart = await col.countDocuments({
    "indexer.blockTime": { $lt: start },
  });
  const distribution = await col
    .aggregate([
      {
        $match: {
          "indexer.blockTime": {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $bucket: {
          groupBy: "$indexer.blockTime",
          boundaries: intervals,
          default: null,
          output: {
            totalEvents: {
              $sum: 1,
            },
          },
        },
      },
      {
        $project: {
          interval: "$_id",
          _id: 0,
          totalEvents: 1,
        },
      },
    ])
    .toArray();

  const distributionMap = new Map(
    distribution.map((x) => [x.interval, x.totalEvents]),
  );
  let totalEvents = totalBeforeStart;
  const chart = intervals
    .filter((x) => x <= end)
    .map((interval) => {
      const totalEventsInInterval = distributionMap.get(interval) || 0;
      totalEvents += totalEventsInInterval;
      return {
        interval,
        totalEvents,
      };
    });
  ctx.body = chart;
}

async function getEvents(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const {
    section,
    method,
    is_extrinsic: isExtrinsic,
    no_extrinsic_result: noExtrinsicResult,
  } = ctx.query;
  const q = {
    ...getTimeDimension(ctx),
  };
  if (section) {
    q.section = section;
  }
  if (method) {
    q.method = method;
  }
  if (isExtrinsic === "true") {
    q.isExtrinsic = true;
  }
  if (noExtrinsicResult === "true") {
    q.isExtrinsicResult = false;
  }

  const col = await getEventCollection();
  const total = await col.countDocuments();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getEvents,
  getChart,
};
