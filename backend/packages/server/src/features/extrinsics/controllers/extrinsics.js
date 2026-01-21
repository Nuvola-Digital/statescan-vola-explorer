const { extractPage, extractDateRange, getBoundariesByInterval } = require("../../../utils");
const {
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");
const { getTimeDimension } = require("../../../common/getTimeDimension");
const { getCallQueryParams } = require("../../../common/getCallParams");

async function getChart(ctx) {
  const col = await getExtrinsicCollection();
  const { start, end, interval } = extractDateRange(ctx);
  const intervals = getBoundariesByInterval(start, end, interval);
  const totalBeforeStart = await col.countDocuments({"indexer.blockTime": {$lte: start}});
  const distribution = await col.aggregate([
    {
      $match: {
        "indexer.blockTime": {
          $gt: start,
          $lte: end,
        },
      },
    },
    {
      $bucket: {
        groupBy: "$indexer.blockTime",
        boundaries: intervals,
        default: null,
        output: {
          totalExtrinsics: {
            $sum: 1
          }
        }
      }
    },
    {
      $project: {
        interval: "$_id",
        _id: 0,
        totalExtrinsics: 1
      }
    }
  ]).toArray();

  const distributionMap = new Map(distribution.map((x) => [x.interval, x.totalExtrinsics]));
  let totalExtrinsics = totalBeforeStart;
  const chart = [
    { interval: start, totalExtrinsics },
    ...intervals
      .filter((x) => x > start && x <= end)
      .map((intervalEnd) => {
        const intervalStart = intervalEnd - interval;
        const totalExtrinsicsInInterval = distributionMap.get(intervalStart) || 0;
        totalExtrinsics += totalExtrinsicsInInterval;
        return {
          interval: intervalEnd,
          totalExtrinsics,
        };
      }),
  ];
  ctx.body = chart;
}

async function getExtrinsics(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { signed_only: signedOnly } = ctx.query;
  const q = {
    ...getTimeDimension(ctx),
    ...getCallQueryParams(ctx),
  };
  if (signedOnly === "true") {
    q.isSigned = true;
  }

  const col = await getExtrinsicCollection();
  const items = await col
    .find(q, { projection: { nonce: 0, _id: 0, tip: 0, signature: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.extrinsicIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  ctx.body = {
    items,
    page,
    pageSize,
  };
}

module.exports = {
  getExtrinsics,
  getChart
};
