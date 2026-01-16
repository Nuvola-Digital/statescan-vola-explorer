const {
  block: { getBlockDb, getExtrinsicCollection },
  asset: { getAssetCol },
  account: { getAddressCollection },
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");
const { isAssetsChain, isUniquesChain, isPolimec } = require("../../env");
const { getTransferColByChain } = require("../../common/transfer/col");
const {
  block: { getEventCollection },
} = require("@statescan/mongo");

const {
  chain: { getApi },
} = require("@osn/scan-common");
const overview = {};

async function updateHeightsAndIssuance() {
  const col = await getBlockDb().getStatusCol();
  const latest = await col.findOne({ name: "latestHeight" });
  const finalized = await col.findOne({ name: "finalizedHeight" });
  const issuance = await col.findOne({ name: "totalIssuance" });
  if (latest) {
    overview.latestHeight = latest.value;
  }
  if (finalized) {
    overview.finalizedHeight = finalized.value;
  }
  if (issuance) {
    overview.totalIssuance = issuance.value;
  }
}

async function updateSignedExtrinsics() {
  const col = await getExtrinsicCollection();
  overview.signedExtrinsics = await col.count({ isSigned: true });
}

async function updateTransfers() {
  const col = await getTransferColByChain();
  overview.transfers = await col.estimatedDocumentCount();
}

async function updateAccounts() {
  const col = await getAddressCollection();
  overview.accounts = await col.estimatedDocumentCount();
}

async function updateAssets() {
  const col = await getAssetCol();
  overview.assets = await col.countDocuments({ destroyed: false });
}

async function updateNftClasses() {
  const col = await getClassCol();
  const total = await col.countDocuments({ isDestroyed: false });
  const valid = await col.countDocuments({
    isDestroyed: false,
    definitionValid: true,
  });
  overview.nftClasses = { valid, total };
}

async function updateNftInstances() {
  const col = await getInstanceCol();
  const total = await col.countDocuments({ isDestroyed: false });
  const valid = await col.countDocuments({
    isDestroyed: false,
    isClassDestroyed: false,
    $or: [
      { definitionValid: true },
      { definitionValid: null, classDefinitionValid: true },
    ],
  });
  overview.nftInstances = { valid, total };
}
async function updateValidatorsAndEvents() {
  const api = await getApi();
  const validators = await api.query.palletStaking.counterForValidators();
  overview.validators = validators.toNumber();

  const col = await getEventCollection();
  const total = await col.countDocuments();
  overview.totalEvents = total;

  // overview.circulatingSupply =
}
async function updateAll() {
  await updateHeightsAndIssuance();
  await updateSignedExtrinsics();
  await updateTransfers();
  await updateAccounts();
  await updateValidatorsAndEvents();
  if (isAssetsChain() || isPolimec()) {
    await updateAssets();
  }

  if (isUniquesChain()) {
    await updateNftClasses();
    await updateNftInstances();
  }
}

async function updateOverview() {
  try {
    await updateAll();
  } finally {
    setTimeout(updateOverview, 6000);
  }
}

async function getDetailedOverview() {
  try {
    const api = await getApi();
    if (overview.totalIssuance) {
      const accounts = [
        "5DHkp437qFfVZgLveRtF2dqQNQ3dQGyog6t8CWm5VnR1KbSe",
        "5HgycssXyZR9ZRz1E2BjPND16gt348NBUKpzo6J5pParKeDc",
        "5FRTMVserRHhv979wbzq1guvQBqZc4LUbBK6NmeNBTyR8jiT",
        "5GUL7FQGXTxkkmeVPmHSiffSY35R7ysjHRgru6fhNMJxqUb4",
        "5EP5Dg5n6voMoGcd6S8MVm1gKNGRqwiojutLSxfaNwvC7x5M",
        "5HiwEvaQdAx1t2VVSH24oderuYb3pavJrEcgpnyZBXDrgo2f",
      ];
      const results = await api.query.system.account.multi(accounts);
      const totalBalance = results.reduce(
        (sum, r) => sum + r.data.free.toBigInt(),
        0n,
      );

      const circulatingSupply = BigInt(overview.totalIssuance) - totalBalance;
      overview.circulatingSupply = circulatingSupply.toString();
    }

    const currentEpoch = await api.query.timeframe.epochNow();
    const epochRevenue = await api.query.storageEarnings.totalRevenue();
    overview.currentEpochRevenue = epochRevenue.toString();
    overview.currentEpoch = currentEpoch.toString();
  } catch (e) {
    console.error(e);
  }
}

function getOverview() {
  return overview;
}

module.exports = {
  updateOverview,
  getOverview,
  getDetailedOverview
};
