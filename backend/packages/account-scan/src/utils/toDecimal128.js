const { Decimal128 } = require("mongodb");
const BigNumber = require("bignumber.js");

function toDecimal128(num) {
  return Decimal128.fromStringWithRounding(new BigNumber(num).toString());
}

module.exports = {
  toDecimal128,
};
