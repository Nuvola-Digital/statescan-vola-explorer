/**
 * Converts bytes to human-readable storage units
 * @param {number} bytes - The number of bytes to convert
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Human-readable storage string (e.g., "1.5 GB")
 */
export function humanReadableStorage(bytes, decimals = 2) {
  if (bytes === null || bytes === undefined || isNaN(bytes)) {
    return "---";
  }

  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1000;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  const index = Math.min(i, sizes.length - 1);

  const value = bytes / Math.pow(k, index);
  const formattedValue = value.toFixed(decimals);

  // Remove trailing zeros after decimal point
  const cleanValue = parseFloat(formattedValue).toString();

  return `${cleanValue} ${sizes[index]}`;
}

export default humanReadableStorage;
