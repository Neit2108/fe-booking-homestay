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
export const formatDate = (
    date,
    {
      locale = "en-US",
      format = "short",
      customOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
    } = {}
  ) => {
    if (!date) return "Invalid Date";
  
    const dateObj = typeof date === "string" ? new Date(date) : date;
  
    if (isNaN(dateObj.getTime())) return "Invalid Date";
  
    // Define format presets
    const formatOptions = {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      medium: {
        year: "numeric",
        month: "short",
        day: "2-digit",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
      },
    };
  
    // Choose formatting options based on format type
    const options =
      format === "custom" ? customOptions : formatOptions[format] || formatOptions.short;
  
    try {
      return new Intl.DateTimeFormat(locale, options).format(dateObj);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };