/**
 * @param {string} text
 * @returns {string} Transforms "some text" to "Some text".
 */
export function toFirstLetterUppercase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
