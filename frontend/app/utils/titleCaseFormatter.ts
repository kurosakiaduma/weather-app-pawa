/**
 * Converts a string to title case (capitalizes the first letter of each word).
 * 
 * @param {string} str - The string to convert to title case.
 * @returns {string} The string converted to title case, or an empty string if the input is falsy.
 * 
 * @example
 * // returns "Hello World"
 * titleCase("hello world");
 * 
 * @example
 * // returns "The Quick Brown Fox"
 * titleCase("the quick brown fox");
 * 
 * @example
 * // returns ""
 * titleCase(null);
 */
export const titleCase = (str: string | null | undefined): string => {
  if (!str) {
    return "";
  }
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}