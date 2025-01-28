const Router = require("koa-router");

const router = new Router();

router.get("/health-check", async (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "healthy",
    uptime: `${Math.round(process.uptime() / 60)} Minutes`,
    timestamp: new Date().toISOString(),
  };
});

module.exports = router;
