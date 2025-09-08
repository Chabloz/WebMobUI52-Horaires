/**
 * Normalize text by removing diacritics (accents) and converting to lowercase
 * @param {string} text - The text to normalize
 * @returns {string} - Normalized text without diacritics
 */
export function normalizeText(text) {
  if (!text) return '';

  return text
    .toLowerCase()
    .normalize('NFD') // Decompose characters with diacritics
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
}

/**
 * Check if text contains search term, ignoring diacritics
 * @param {string} text - The text to search in
 * @param {string} searchTerm - The search term
 * @returns {boolean} - True if text contains search term
 */
export function textIncludes(text, searchTerm) {
  return normalizeText(text).includes(normalizeText(searchTerm));
}
