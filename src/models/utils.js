/**
 * @param {string} text
 * @returns {string} Transforms "some text" to "Some text".
 */
export function toFirstLetterUppercase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Rounds the number to certain number of decimals. The result is still Number, so something like `12.00` will be returned as `12`.
 * @param {number | string} num Number to round.
 * @param {number} decimals Optional (default = 0). Number of decimals.
 * @returns {number}
 */
export function roundTo(num, decimals = 0) {
  return parseFloat(Number(num).toFixed(decimals));
}
