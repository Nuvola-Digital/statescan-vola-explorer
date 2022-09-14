const { deleteFrom } = require("../mongo/services/delete");
const { updateUnFinalized } = require("./unFinalized");
const {
  batchUpsertCalls,
  batchInsertCalls,
} = require("../mongo/services/call");
const { extractCalls } = require("./call");
const {
  batchUpsertExtrinsics,
  batchInsertExtrinsics,
} = require("../mongo/services/extrinsic");
const {
  batchUpsertEvents,
  batchInsertEvents,
} = require("../mongo/services/event");
const { upsertBlock, insertBlock } = require("../mongo/services/block");
const { normalizeBlock } = require("./block");
const { normalizeEvents } = require("./event");
const { normalizeExtrinsics } = require("./extrinsic");
const {
  chain: { getBlockIndexer, getLatestFinalizedHeight },
  scan: { oneStepScan },
  utils: { sleep },
  logger,
} = require("@osn/scan-common");
const {
  block: { getBlockDb },
} = require("@statescan/mongo");

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  const normalizedBlock = normalizeBlock(block, author, events, blockIndexer);
  const normalizedEvents = normalizeEvents(events, blockIndexer);
  const normalizedExtrinsics = normalizeExtrinsics(
    block.extrinsics,
    events,
    blockIndexer,
  );
  const normalizedCalls = await extractCalls(
    block.extrinsics,
    events,
    blockIndexer,
  );

  await insertBlock(normalizedBlock);
  await batchInsertExtrinsics(normalizedExtrinsics);
  await batchInsertEvents(normalizedEvents);
  await batchInsertCalls(normalizedCalls);

  const db = getBlockDb();
  await db.updateScanHeight(height);

  const finalizedHeight = getLatestFinalizedHeight();
  if (height >= finalizedHeight) {
    await updateUnFinalized(finalizedHeight);
  }
}

async function wrappedHandleBlock(wrappedBlock) {
  try {
    await handleBlock(wrappedBlock);
  } catch (e) {
    logger.error(`${wrappedBlock.height} scan error`, e);
    throw e;
  }
}

async function scan() {
  const db = getBlockDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  while (true) {
    toScanHeight = await oneStepScan(toScanHeight, wrappedHandleBlock, true);
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
};
