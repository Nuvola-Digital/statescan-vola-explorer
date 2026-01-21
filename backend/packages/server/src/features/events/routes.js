const Router = require("koa-router");
const { getEvent } = require("./controllers/event");
const { getEvents, getChart } = require("./controllers/events");

const router = new Router();
router.get("/events", getEvents);
router.get("/events/chart", getChart);
router.get("/events/:blockHeight-:eventIndex", getEvent);

module.exports = router;
