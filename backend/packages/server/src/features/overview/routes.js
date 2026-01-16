const Router = require("koa-router");
const { getOverview, getDetailedOverview } = require("../../jobs/overview");

const router = new Router();

router.get("/overview", async (ctx) => {
  await getDetailedOverview();
  ctx.body = getOverview();
});

module.exports = router;
