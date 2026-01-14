function extractPage(ctx = {}) {
  const { page_size: queryPageSize, page: queryPage } = ctx.query || {};

  let pageSize;
  try {
    pageSize = parseInt(queryPageSize);
    pageSize = isNaN(pageSize) ? 10 : Math.max(1, pageSize);
  } catch (e) {
    pageSize = 10;
  }

  let page;
  if (queryPage === "last") {
    page = queryPage;
  } else {
    try {
      page = parseInt(queryPage);
      page = isNaN(page) ? 0 : Math.max(0, page);
    } catch (e) {
      page = 0;
    }
  }

  return {
    page,
    pageSize,
  };
}

function extractDateRange(ctx = {}) {
  const { start: startTs, end: endTs, interval: intervalMs } = ctx.query || {};
  let start = Date.now() - 5 * 60 * 60 * 1000; // from 5 hour ago
  let end = Date.now();
  let interval = 60 * 60 * 1000; // 1 hour
  if (parseInt(startTs)) {
    start = parseInt(startTs);
  }
  if (parseInt(endTs)) {
    end = parseInt(endTs);
  }
  if (parseInt(intervalMs)) {
    interval = parseInt(intervalMs);
  }
  return { start, end, interval };
}

module.exports = {
  extractPage,
  extractDateRange
};
