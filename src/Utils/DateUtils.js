// utils/dateUtils.js

/**
 * Formats a date string or Date object into a readable format.
 * @param {string | Date} date - The date to format (e.g., "2025-04-11T00:00:00Z" or Date object).
 * @param {object} [options] - Optional formatting options.
 * @param {string} [options.locale='en-US'] - Locale for formatting (e.g., 'en-US', 'vi-VN').
 * @param {string} [options.format='short'] - Predefined format: 'short', 'medium', 'long', or 'custom'.
 * @param {object} [options.customOptions] - Custom Intl.DateTimeFormat options for 'custom' format.
 * @returns {string} - Formatted date string (e.g., "4/11/2025" or "11/04/2025").
 */
// Format date to display only day, month, year in a readable format
export const formatDate = (dateString) => {
  if (!dateString) return "Not set";
  
  try {
    // Try to parse the timestamp format: "2025-05-01 17:34:46.890118+00"
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.log(`Invalid date: ${dateString}`);
      return "Invalid Date";
    }
    
    // Format as DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error(`Error formatting date: ${dateString}`, error);
    return "Invalid Date";
  }
};